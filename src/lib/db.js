'use strict'
const MongoClient = require("mongodb").MongoClient

let cachedDb = null;

module.exports.connectToDatabase = async () => {
    if (cachedDb) {
        console.log("Use existing connection")
        return Promise.resolve(cachedDb)
    }else {
        console.log(process.env.MDB_String)
        return MongoClient.connect(process.env.MDB_String, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((client)=>{
            let db = client.db("syed");
            console.log("New DB Connection");
            cachedDb = db;
            return cachedDb;
        }).catch((error)=>{
            console.log(" We got Error in DB connection")
            console.log(error)
        })
    }
}

