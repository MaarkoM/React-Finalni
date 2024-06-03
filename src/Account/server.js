import express from "express";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const PORT = 8080;

console.log(PORT);

app.use(express.json());

app.use(cors());

const JWT_SECRET = "your_jwt_secret";

const generateToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
};

let db;
(async () => {
  db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);
})();

app.post("/api/signup", async (req, res) => {
  console.log(req, res);
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const user = { id: result.lastID, username, email };
    const token = generateToken(user);
    res.status(200).json({ message: "Signup successful", token });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      res.status(400).json({ message: "Email already in use" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
