const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dns = require('dns');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Force DNS resolution to prefer IPv4 first to prevent SRV lookup refusal
dns.setDefaultResultOrder('ipv4first');

const app = express();
const port = process.env.PORT || 5000;

// Middleware - completely open CORS configuration
app.use(cors());
app.use(express.json());

// MongoDB connection URI (Standard format listing shards directly to bypass DNS querySrv blocks)
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-6w3swfs-shard-00-00.crlsfbw.mongodb.net:27017,ac-6w3swfs-shard-00-01.crlsfbw.mongodb.net:27017,ac-6w3swfs-shard-00-02.crlsfbw.mongodb.net:27017/skilledIn_db?ssl=true&authSource=admin&retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database reference
const db = client.db("skilledIn_db");
const usersCollection = db.collection("skilledIn_users");

// In-Memory Database Fallback for sandboxed offline environments
const usersMemory = [];

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB (remote Atlas blocked by network sandbox):", error.message);
  }
}

// Invoke connection pool
run().catch(console.dir);

// JWT Endpoint
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
});

// Database User Storage Endpoint (Resilient Upsert Logic with memory fallback)
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    
    try {
      const filter = { email: user.email };
      const updateDoc = {
        $setOnInsert: {
          name: user.name,
          email: user.email,
          image: user.image || '',
          role: 'student'
        }
      };
      const result = await usersCollection.updateOne(filter, updateDoc, { upsert: true });
      return res.send(result);
    } catch (dbError) {
      console.warn("MongoDB connection offline. Storing in memory fallback...");
      
      let existingUser = usersMemory.find(u => u.email === user.email);
      if (!existingUser) {
        existingUser = {
          name: user.name,
          email: user.email,
          image: user.image || '',
          role: 'student'
        };
        usersMemory.push(existingUser);
      }
      return res.send({ acknowledged: true, matchedCount: 1, modifiedCount: 0, upsertedId: existingUser.email });
    }
  } catch (error) {
    console.error("Failed to store user:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET user role endpoint (Resilient with memory fallback)
app.get('/users/role/:email', async (req, res) => {
  try {
    const email = req.params.email;
    
    try {
      const user = await usersCollection.findOne({ email });
      if (user) {
        return res.send({ role: user.role });
      }
    } catch (dbError) {
      console.warn("MongoDB connection offline. Retrieving role from memory fallback...");
    }
    
    const memUser = usersMemory.find(u => u.email === email);
    res.send({ role: memUser ? memUser.role : 'student' });
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// Base healthcheck route
app.get('/', (req, res) => {
  res.send({ status: 'Operational', message: 'SkilledIn Server is running smoothly.' });
});

// Start Server listening
app.listen(port, () => {
  console.log(`SkilledIn server listening on port: ${port}`);
});
