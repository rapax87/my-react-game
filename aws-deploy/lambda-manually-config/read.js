'use strict';

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 

exports.readAllGames = function(event, context, callback){
	var params = {
		TableName : process.env.TABLE_NAME
	};
	documentClient.scan(params, function(err, data){
		if(err){
		    callback(err, null);
		}else{
		    callback(null, data.Items);
		}
	});
}

// node.js.6.10
// config manually http://www.blog.labouardy.com/create-a-serverless-rest-api-with-node-js-aws-lambda-dynamodb-api-gateway/