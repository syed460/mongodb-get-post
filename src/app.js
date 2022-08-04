'use strict'
const { connectToDatabase } = require('./lib/db');

module.exports.lambdahandler = async (event, context) => {

    console.log("Got Get method")
    const db = await connectToDatabase();
    const collections = await db.collection("users");

    const users = await collections.find({}).toArray();

    console.log(users)
    return { body: JSON.stringify(users) }

}
