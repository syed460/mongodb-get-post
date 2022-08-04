'use strict'

var MongoClient = require('mongodb').MongoClient;
let cachedDb = null;

let atlas_connection_uri = null;


var uri = process.env.MDB_String;

if (atlas_connection_uri == null) {
    atlas_connection_uri = uri;
}
processEvent(event, context, callback);

function connectToDatabase(uri) {

    //Performance optimization Step 3: test that database connection exists and is valid
    //before re-using it
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
        console.log('=> using cached database instance');
        return Promise.resolve(cachedDb);
    }
    const dbName = 'syed';
    return MongoClient.connect(uri)
        .then(client => { cachedDb = client.db(dbName); return cachedDb; });
}

function processEvent(event, context, callback) {
    connectToDatabase(atlas_connection_uri)
        .then(db => queryDatabase(db, event))
        .then(result => {
            console.log('query results: ', result);
            callback(null, result);
        })
        .catch(err => {
            console.log('=> an error occurred: ', err);
            callback(err);
        });
}

function queryDatabase(db, event) {   
    var jsonContents = JSON.parse(JSON.stringify(event));
    
    //handling API Gateway input where the event is embedded into the 'body' element
    if (event.body !== null && event.body !== undefined) {
        console.log('retrieving payload from event.body');
        jsonContents = JSON.parse(event.body);
    }

    console.log('query parameters: ', jsonContents);
    return db.collection('users').aggregate([{ $match: { "address.zipcode": jsonContents.zipcode, "cuisine": jsonContents.cuisine, "name": new RegExp(jsonContents.startsWith) } },
    { $project: { "_id": 0, "name": 1, "address.building": 1, "address.street": 1, "borough": 1, "address.zipcode": 1, "healthScoreAverage": { $avg: "$grades.score" }, "healthScoreWorst": { $max: "$grades.score" } } }
    ]).toArray()
        .then(docs => { return docs;})
        .catch(err => { return err; });
}