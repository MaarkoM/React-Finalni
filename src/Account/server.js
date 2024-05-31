// import express from 'express';
// import jwt from 'jsonwebtoken';
// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';
// import bcrypt from 'bcrypt';

// const app = express();
// const PORT = process.env.PORT || 5173;

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Secret key for JWT (keep it in an environment variable for production)
// const JWT_SECRET = 'your_jwt_secret';

// // Function to generate a JWT token
// const generateToken = (user) => {
//   return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
// };

// // Initialize and connect to the SQLite database
// let db;
// (async () => {
//   db = await open({
//     filename: './database.db',
//     driver: sqlite3.Database
//   });

//   // Create users table if it doesn't exist
//   await db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT,
//     email TEXT UNIQUE,
//     password TEXT
//   )`);
// })();

// // POST endpoint for signup
// app.post('http://localhost:5173/api/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user into the database
//     const result = await db.run(
//       'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//       [username, email, hashedPassword]
//     );

//     const user = { id: result.lastID, username, email };
//     const token = generateToken(user);
//     res.status(200).json({ message: 'Signup successful', token });
//   } catch (error) {
//     if (error.code === 'SQLITE_CONSTRAINT') {
//       // Handle unique constraint violation (e.g., duplicate email)
//       res.status(400).json({ message: 'Email already in use' });
//     } else {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// });

// // POST endpoint for login
// app.post('http://localhost:5173/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user in the database
//     const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

//     if (user && await bcrypt.compare(password, user.password)) {
//       const token = generateToken({ id: user.id, username: user.username, email: user.email });
//       res.status(200).json({ message: 'Login successful', token });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Secret key for JWT (keep it in an environment variable for production)
const JWT_SECRET = 'your_jwt_secret';

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
};

// Initialize and connect to the SQLite database
let db;
(async () => {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  // Create users table if it doesn't exist
  await db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);
})();

// POST endpoint for signup
app.post('http://localhost:5173/api/signup', async (req, res) => {
  console.log(req, res)
  const { username, email, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const result = await db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    const user = { id: result.lastID, username, email };
    const token = generateToken(user);
    res.status(200).json({ message: 'Signup successful', token });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      // Handle unique constraint violation (e.g., duplicate email)
      res.status(400).json({ message: 'Email already in use' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// POST endpoint for login
app.post('http://localhost:5173/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in the database
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken({ id: user.id, username: user.username, email: user.email });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});