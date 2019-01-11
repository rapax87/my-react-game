'use strict';

var AWS = require('aws-sdk'),
    uuid = require('uuid'),
    documentClient = new AWS.DynamoDB.DocumentClient();

exports.writeGame = function(event, context, callback){
    var params = {
        Item : {
            // "id" : uuid.v1(),
            "id" : "1",
            "state" : event.state
        },
        TableName : process.env.TABLE_NAME
    };
    documentClient.put(params, function(err, data){
        callback(err, data);
    });
}

// node.js.6.10