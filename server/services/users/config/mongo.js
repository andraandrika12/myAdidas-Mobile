const { MongoClient } = require("mongodb");

const uri = process.env.URI;
const dbName = 'server';

const client = new MongoClient(uri)

let db = {}

async function connect() {
    try {
        await client.connect();
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error("Error connect to MongoDB:", error);
    }
}


function getDb() {
    return db
}


module.exports = {
    connect, getDb
}