const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-6w3swfs-shard-00-00.crlsfbw.mongodb.net:27017,ac-6w3swfs-shard-00-01.crlsfbw.mongodb.net:27017,ac-6w3swfs-shard-00-02.crlsfbw.mongodb.net:27017/skilledIn_db?ssl=true&authSource=admin&retryWrites=true&w=majority`;

console.log("Connecting with standard URI format...");
const client = new MongoClient(uri);

async function test() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("SUCCESSFULLY CONNECTED TO MONGODB ATLAS!");
  } catch (err) {
    console.error("CONNECTION FAILED:", err);
  } finally {
    await client.close();
  }
}

test();
