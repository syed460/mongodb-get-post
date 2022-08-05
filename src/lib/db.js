'use strict'
const MongoClient = require("mongodb").MongoClient
const { dbUser } = require('../ssmGetCreden')

let cachedDb = null;

module.exports.connectToDatabase = async () => {
    if (cachedDb) {
        console.log("Use existing connection")
        return Promise.resolve(cachedDb)
    }else {
        const result = await dbUser()
        let data ={username: '', password: ''};
        for (const element of result.Parameters){
            // console.log(element)
            if (result.Parameters.Name === '/mongodb/dev/password'){
                data.password = result.Parameters.Value
            }else if (result.Parameters.Name === '/mongodb/dev/username'){
                data.username = result.Parameters.Value
            }
        }

        let uri = "mongodb+srv://" + data.username + ":" + 'test'+'@cluster0.masxk.mongodb.net/?retryWrites=true&w=majority'
        console.log(uri)
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



