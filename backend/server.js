// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // This matches the fetch URL in your React app
// app.get('/api/message', (req, res) => {
//   res.json({ message: "Hello from Node.js backend!" });
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });

// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Replace this with your actual MongoDB Atlas connection string when ready
// // Example: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hostel-hub?retryWrites=true&w=majority
// const MONGO_URI = 'mongodb://localhost:27017/hostel-hub'; 

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB successfully!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Test route
// app.get('/api/message', (req, res) => {
//   res.json({ message: "Hello from Node.js backend with MongoDB ready!" });
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });

// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import Room from './models/Room.js'; // Import your new Room model

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB connection (using local MongoDB or your Atlas URI)
// const MONGO_URI = 'mongodb://localhost:27017/hostel-hub'; 

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB successfully!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // 1. GET route to fetch all rooms from the database
// app.get('/api/rooms', async (req, res) => {
//   try {
//     const rooms = await Room.find();
//     res.json(rooms);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch rooms' });
//   }
// });

// // 2. POST route to create and save a new room
// app.post('/api/rooms', async (req, res) => {
//   try {
//     const { roomNumber, capacity, pricePerMonth } = req.body;
    
//     const newRoom = new Room({
//       roomNumber,
//       capacity,
//       pricePerMonth
//     });

//     const savedRoom = await newRoom.save();
//     res.status(201).json(savedRoom);
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to create room' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });

// import 'dotenv/config'; // <-- 1. Add this at the very top
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import Room from './models/Room.js';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 2. Use process.env.MONGO_URI here
// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB Atlas successfully!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // 1. GET route to fetch all rooms from the database
// app.get('/api/rooms', async (req, res) => {
//   try {
//     const rooms = await Room.find();
//     res.json(rooms);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch rooms' });
//   }
// });

// // 2. POST route to create and save a new room
// app.post('/api/rooms', async (req, res) => {
//   try {
//     const { roomNumber, capacity, pricePerMonth } = req.body;
    
//     const newRoom = new Room({
//       roomNumber,
//       capacity,
//       pricePerMonth
//     });

//     const savedRoom = await newRoom.save();
//     res.status(201).json(savedRoom);
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to create room' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });


// import 'dotenv/config';
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dns from 'dns';

// // Force Google DNS to bypass network/ISP blocking
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: true, credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Test Route
// app.get("/", (req, res) => {
//   res.json({ success: true, message: "Hostel Hub API is running..." });
// });

// // Database Connection & Server Startup
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB successfully!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // 1. GET route to fetch all rooms from the database
// app.get('/api/rooms', async (req, res) => {
//   try {
//     const rooms = await Room.find();
//     res.json(rooms);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch rooms' });
//   }
// });

// // 2. POST route to create and save a new room
// app.post('/api/rooms', async (req, res) => {
//   try {
//     const { roomNumber, capacity, pricePerMonth } = req.body;
    
//     const newRoom = new Room({
//       roomNumber,
//       capacity,
//       pricePerMonth
//     });

//     const savedRoom = await newRoom.save();
//     res.status(201).json(savedRoom);
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to create room' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });


import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dns from 'dns';
import Room from './models/Room.js';

// Force Google DNS to bypass network/ISP blocking
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pull the database connection string from your .env file
const MONGO_URI = process.env.MONGO_URI;

// Root / Test Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Hostel Hub API is running..." });
});

// GET route to fetch all rooms from the database
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// POST route to create and save a new room
app.post('/api/rooms', async (req, res) => {
  try {
    const { roomNumber, capacity, pricePerMonth } = req.body;
    
    const newRoom = new Room({
      roomNumber,
      capacity,
      pricePerMonth
    });

    const savedRoom = await newRoom.save();
    
    res.status(201).json(savedRoom);
  } catch (err) {
    console.error("Error creating room:", err);
    res.status(400).json({ error: 'Failed to create room' });
  }
});

// Database Connection & Server Startup
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });