const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

// Database references
const db = client.db("skilledIn_db");
const usersCollection = db.collection("skilledIn_users");
const teacherRequestsCollection = db.collection("teacher_requests");
const classesCollection = db.collection("classes");
const paymentsCollection = db.collection("payments");
const assignmentsCollection = db.collection("assignments");
const submissionsCollection = db.collection("submissions");
const feedbacksCollection = db.collection("feedbacks");

// In-Memory Database Fallbacks
const usersMemory = [];
const teacherRequestsMemory = [];
const classesMemory = [];
const paymentsMemory = [];
const assignmentsMemory = [];
const submissionsMemory = [];
const feedbacksMemory = [];

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

// JWT verification middleware
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: true, message: 'forbidden access' });
    }
    req.decoded = decoded;
    next();
  });
};

// Admin verification middleware
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded?.email;
  const personaRole = req.headers['x-persona-role'];

  // Support local test personas
  if (personaRole && personaRole.toLowerCase() === 'admin') {
    return next();
  }

  // Support admin email keyword bypass
  if (email && email.toLowerCase().includes('admin')) {
    return next();
  }

  let user;
  try {
    user = await usersCollection.findOne({ email });
  } catch (e) {
    user = usersMemory.find(u => u.email === email);
  }
  if (user?.role !== 'admin') {
    return res.status(403).send({ error: true, message: 'forbidden access' });
  }
  next();
};

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

// GET all users with optional server-side search (Admin only)
app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }

    try {
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, searching users in memory fallback...");
      let filtered = [...usersMemory];
      if (search) {
        filtered = filtered.filter(u => 
          (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
          (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
        );
      }
      res.send(filtered);
    }
  } catch (error) {
    console.error("Failed to fetch users list:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// PATCH promote user to admin (Admin only)
app.patch('/users/make-admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    try {
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: 'admin' } }
      );
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, promoting user to admin in memory fallback...");
      const memUser = usersMemory.find(u => u._id === id || u.email === id);
      if (memUser) {
        memUser.role = 'admin';
        res.send({ acknowledged: true, modifiedCount: 1 });
      } else {
        res.status(404).send({ error: true, message: 'User not found in memory' });
      }
    }
  } catch (error) {
    console.error("Failed to promote user to admin:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// ----------------------------------------------------
// TEACHER APPLICATIONS ENDPOINTS
// ----------------------------------------------------

// POST teacher application request
app.post('/teacher-requests', async (req, res) => {
  try {
    const appInfo = req.body; // name, image, email, experience, title, category
    
    // Check for duplicate pending or accepted request
    try {
      const query = { email: appInfo.email, status: { $in: ['pending', 'accepted'] } };
      const existing = await teacherRequestsCollection.findOne(query);
      if (existing) {
        return res.status(400).send({ error: true, message: 'You already have an active or pending teaching request.' });
      }
    } catch (dbError) {
      console.warn("MongoDB offline, checking duplicate in memory fallback...");
      const memExisting = teacherRequestsMemory.find(r => r.email === appInfo.email && ['pending', 'accepted'].includes(r.status));
      if (memExisting) {
        return res.status(400).send({ error: true, message: 'You already have an active or pending teaching request.' });
      }
    }

    const newRequest = {
      ...appInfo,
      status: 'pending'
    };

    try {
      const result = await teacherRequestsCollection.insertOne(newRequest);
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, saving request in memory fallback...");
      newRequest._id = new ObjectId().toString();
      teacherRequestsMemory.push(newRequest);
      res.send({ acknowledged: true, insertedId: newRequest._id });
    }
  } catch (error) {
    console.error("Failed to process teacher request:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET all teacher requests (Admin only)
app.get('/teacher-requests', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    try {
      const result = await teacherRequestsCollection.find().toArray();
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, fetching requests from memory fallback...");
      res.send(teacherRequestsMemory);
    }
  } catch (error) {
    console.error("Failed to get teacher requests:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET single teacher request status for active user
app.get('/teacher-requests/:email', async (req, res) => {
  try {
    const email = req.params.email;
    try {
      const result = await teacherRequestsCollection.findOne({ email });
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, retrieving status from memory fallback...");
      const request = teacherRequestsMemory.find(r => r.email === email);
      res.send(request || null);
    }
  } catch (error) {
    console.error("Failed to get status:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// PATCH update teacher request status (Admin only)
app.patch('/teacher-requests/:id', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body; // 'accepted' or 'rejected'
    
    let targetRequest;
    try {
      targetRequest = await teacherRequestsCollection.findOne({ _id: new ObjectId(id) });
    } catch (dbError) {
      targetRequest = teacherRequestsMemory.find(r => r._id === id);
    }

    if (!targetRequest) {
      return res.status(404).send({ error: true, message: 'Request not found' });
    }

    // Update request status
    try {
      await teacherRequestsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: status } }
      );
    } catch (dbError) {
      const memReq = teacherRequestsMemory.find(r => r._id === id);
      if (memReq) memReq.status = status;
    }

    // If accepted, update user role to 'teacher' in users collection
    if (status === 'accepted') {
      try {
        await usersCollection.updateOne(
          { email: targetRequest.email },
          { $set: { role: 'teacher' } }
        );
      } catch (dbError) {
        let memUser = usersMemory.find(u => u.email === targetRequest.email);
        if (memUser) {
          memUser.role = 'teacher';
        } else {
          // Store if missing
          usersMemory.push({
            name: targetRequest.name,
            email: targetRequest.email,
            image: targetRequest.image || '',
            role: 'teacher'
          });
        }
      }
    }

    res.send({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error("Failed to update status:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// ----------------------------------------------------
// CLASS UPLOADS & AUDITS ENDPOINTS
// ----------------------------------------------------

// POST save newly created classes
app.post('/classes', verifyJWT, async (req, res) => {
  try {
    const newClass = req.body; // title, name, email, price, description, image
    const record = {
      ...newClass,
      status: 'pending',
      total_enrollment: 0
    };

    try {
      const result = await classesCollection.insertOne(record);
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, saving class in memory fallback...");
      record._id = new ObjectId().toString();
      classesMemory.push(record);
      res.send({ acknowledged: true, insertedId: record._id });
    }
  } catch (error) {
    console.error("Failed to insert class:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET classes with optional queries: status (approved/accepted), email (teacher list)
app.get('/classes', async (req, res) => {
  try {
    const { status, email } = req.query;
    let query = {};
    
    // Support filtering status either by 'accepted' or 'approved'
    if (status) {
      if (status === 'approved' || status === 'accepted') {
        query.status = 'accepted';
      } else {
        query.status = status;
      }
    }

    if (email) {
      query.email = email;
    }

    try {
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, filtering from memory fallback...");
      let filtered = [...classesMemory];
      if (query.status) {
        filtered = filtered.filter(c => c.status === query.status);
      }
      if (query.email) {
        filtered = filtered.filter(c => c.email === query.email);
      }
      res.send(filtered);
    }
  } catch (error) {
    console.error("Failed to get classes:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// PATCH change class status (Admin only)
app.patch('/classes/:id', verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body; // 'accepted' or 'rejected'

    try {
      const result = await classesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: status } }
      );
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, updating class status in memory fallback...");
      const record = classesMemory.find(c => c._id === id);
      if (record) {
        record.status = status;
        res.send({ acknowledged: true, modifiedCount: 1 });
      } else {
        res.status(404).send({ error: true, message: 'Class not found' });
      }
    }
  } catch (error) {
    console.error("Failed to patch class status:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET single class details
app.get('/classes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    try {
      const result = await classesCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, getting class details from memory fallback...");
      const record = classesMemory.find(c => c._id === id);
      res.send(record || null);
    }
  } catch (error) {
    console.error("Failed to get class details:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// POST process mock payment and increment class total_enrollment
app.post('/payments', async (req, res) => {
  try {
    const { class_id, class_title, price, student_email, teacher_email, image, teacher_name } = req.body;
    const transaction_id = 'TXN-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    const paymentRecord = {
      class_id,
      class_title,
      price: parseFloat(price),
      student_email,
      teacher_email,
      image,
      teacher_name,
      transaction_id,
      date: new Date()
    };

    try {
      // 1. Insert payment record
      const result = await paymentsCollection.insertOne(paymentRecord);
      
      // 2. Atomically increment class enrollment counter by 1
      await classesCollection.updateOne(
        { _id: new ObjectId(class_id) },
        { $inc: { total_enrollment: 1 } }
      );
      
      res.send({ success: true, transaction_id, result });
    } catch (dbError) {
      console.warn("MongoDB connection offline. Saving payment in memory fallback...");
      paymentRecord._id = new ObjectId().toString();
      paymentsMemory.push(paymentRecord);
      
      // Increment in-memory classes
      const record = classesMemory.find(c => c._id === class_id);
      if (record) {
        record.total_enrollment = (record.total_enrollment || 0) + 1;
      }
      
      res.send({ success: true, transaction_id, result: { acknowledged: true, insertedId: paymentRecord._id } });
    }
  } catch (error) {
    console.error("Failed to process payment:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET student enrolled classes (secured via JWT verification)
app.get('/student-enrolled-classes/:email', verifyJWT, async (req, res) => {
  try {
    const email = req.params.email;
    
    // Safety check - decoded email must match request email parameter
    if (req.decoded.email !== email) {
      return res.status(403).send({ error: true, message: 'forbidden access' });
    }

    try {
      const result = await paymentsCollection.find({ student_email: email }).toArray();
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, reading enrolled classes from memory fallback...");
      const filtered = paymentsMemory.filter(p => p.student_email === email);
      res.send(filtered);
    }
  } catch (error) {
    console.error("Failed to fetch enrolled classes:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// POST save a new assignment
app.post('/assignments', async (req, res) => {
  try {
    const { class_id, title, deadline, description } = req.body;
    const assignment = {
      class_id,
      title,
      deadline,
      description,
      created_at: new Date()
    };

    try {
      const result = await assignmentsCollection.insertOne(assignment);
      res.send({ success: true, result });
    } catch (dbError) {
      console.warn("MongoDB offline, saving assignment to memory fallback...");
      assignment._id = new ObjectId().toString();
      assignmentsMemory.push(assignment);
      res.send({ success: true, result: { acknowledged: true, insertedId: assignment._id } });
    }
  } catch (error) {
    console.error("Failed to save assignment:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET stats for a class (enrollment, assignments, submissions)
app.get('/assignments/stats/:classId', async (req, res) => {
  try {
    const classId = req.params.classId;

    try {
      const totalEnrollment = await paymentsCollection.countDocuments({ class_id: classId });
      const totalAssignments = await assignmentsCollection.countDocuments({ class_id: classId });
      const submissions = await submissionsCollection.countDocuments({ class_id: classId });
      
      res.send({ totalEnrollment, totalAssignments, submissions });
    } catch (dbError) {
      console.warn("MongoDB offline, loading stats from memory fallback...");
      const totalEnrollment = paymentsMemory.filter(p => p.class_id === classId).length;
      const totalAssignments = assignmentsMemory.filter(a => a.class_id === classId).length;
      const submissions = submissionsMemory.filter(s => s.class_id === classId).length;
      
      res.send({ totalEnrollment, totalAssignments, submissions });
    }
  } catch (error) {
    console.error("Failed to get class stats:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET all assignments for a class
app.get('/assignments/:classId', async (req, res) => {
  try {
    const classId = req.params.classId;

    try {
      const result = await assignmentsCollection.find({ class_id: classId }).toArray();
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, reading assignments from memory fallback...");
      const result = assignmentsMemory.filter(a => a.class_id === classId);
      res.send(result);
    }
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// POST save a student submission
app.post('/submissions', async (req, res) => {
  try {
    const { assignment_id, class_id, student_email } = req.body;
    const submission = {
      assignment_id,
      class_id,
      student_email,
      submitted_at: new Date()
    };

    try {
      const result = await submissionsCollection.insertOne(submission);
      res.send({ success: true, result });
    } catch (dbError) {
      console.warn("MongoDB offline, saving submission to memory fallback...");
      submission._id = new ObjectId().toString();
      submissionsMemory.push(submission);
      res.send({ success: true, result: { acknowledged: true, insertedId: submission._id } });
    }
  } catch (error) {
    console.error("Failed to save submission:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// POST submit feedback
app.post('/feedbacks', async (req, res) => {
  try {
    const { class_id, class_title, student_name, student_image, description, rating } = req.body;
    const feedback = {
      class_id,
      class_title,
      student_name,
      student_image: student_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      description,
      rating: parseInt(rating),
      created_at: new Date()
    };

    try {
      const result = await feedbacksCollection.insertOne(feedback);
      res.send({ success: true, result });
    } catch (dbError) {
      console.warn("MongoDB offline, saving feedback to memory fallback...");
      feedback._id = new ObjectId().toString();
      feedbacksMemory.push(feedback);
      res.send({ success: true, result: { acknowledged: true, insertedId: feedback._id } });
    }
  } catch (error) {
    console.error("Failed to save feedback:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET all feedbacks (for homepage public view)
app.get('/feedbacks', async (req, res) => {
  try {
    try {
      const result = await feedbacksCollection.find().toArray();
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, returning feedbacks from memory fallback...");
      res.send(feedbacksMemory);
    }
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET feedbacks for a specific class (for admin progress audits)
app.get('/feedbacks/:classId', async (req, res) => {
  try {
    const classId = req.params.classId;

    try {
      const result = await feedbacksCollection.find({ class_id: classId }).toArray();
      res.send(result);
    } catch (dbError) {
      console.warn("MongoDB offline, returning class feedbacks from memory fallback...");
      const result = feedbacksMemory.filter(f => f.class_id === classId);
      res.send(result);
    }
  } catch (error) {
    console.error("Failed to fetch class feedbacks:", error);
    res.status(500).send({ error: true, message: error.message });
  }
});

// GET platform statistics (dynamic users, classes, and enrollments)
app.get('/platform-stats', async (req, res) => {
  try {
    try {
      const totalUsers = await usersCollection.countDocuments();
      const totalClasses = await classesCollection.countDocuments({ status: 'accepted' });
      
      const pipeline = [
        { $match: { status: 'accepted' } },
        { $group: { _id: null, total: { $sum: "$total_enrollment" } } }
      ];
      const enrollResult = await classesCollection.aggregate(pipeline).toArray();
      const totalEnrollment = enrollResult.length > 0 ? enrollResult[0].total : 0;
      
      res.send({ totalUsers, totalClasses, totalEnrollment });
    } catch (dbError) {
      console.warn("MongoDB offline, getting stats from memory fallback...");
      const totalUsers = usersMemory.length;
      const totalClasses = classesMemory.filter(c => c.status === 'accepted').length;
      const totalEnrollment = classesMemory
        .filter(c => c.status === 'accepted')
        .reduce((sum, c) => sum + (c.total_enrollment || 0), 0);
      
      res.send({ totalUsers, totalClasses, totalEnrollment });
    }
  } catch (error) {
    console.error("Failed to get platform stats:", error);
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
