'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the game item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      // '#game_text': 'text',
      '#game_state': 'state',
    },
    ExpressionAttributeValues: {
      // ':text': data.text,
      // ':checked': data.checked,
      ':state': data.state,
      ':updatedAt': timestamp,
    },
    // UpdateExpression: 'SET #game_text = :text, checked = :checked, updatedAt = :updatedAt',
    UpdateExpression: 'SET #game_state = :state, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the game in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the game item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
        // HERE'S THE CRITICAL PART
        headers: {
            "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
