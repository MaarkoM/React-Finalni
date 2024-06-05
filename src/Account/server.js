import express from "express";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { OAuth2Client } from 'google-auth-library';

const app = express();

const PORT = 8080;

console.log(PORT);

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

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
    password TEXT,
    resetPasswordToken TEXT,
    resetPasswordExpires INTEGER
  )`);

  await db.run(`CREATE TABLE IF NOT EXISTS revoked_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT,
    user_id INTEGER,
    reason TEXT
  )`);

})();

const checkBlacklist = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];
  const existingToken = await db.get(
    "SELECT * FROM revoked_tokens WHERE token = ?",
    [token]
  );
  if (existingToken) {
    return res.status(401).json({ message: "Token revoked" });
  }
  next();
};

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

app.post("/api/revoke-token", async (req, res) => {
  const { token, userId, reason } = req.body;

  try {
    const existingToken = await db.get(
      "SELECT * FROM revoked_tokens WHERE token = ?",
      [token]
    );

    if (existingToken) {
      return res.status(400).json({ message: "Token already revoked" });
    }

    await db.run(
      "INSERT INTO revoked_tokens (token, user_id, reason) VALUES (?, ?, ?)",
      [token, userId, reason]
    );

    res.status(200).json({ message: "Token revoked successfully" });
  } catch (error) {
    console.error("Error revoking token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/protected-route", checkBlacklist, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

// const oauth2Client = new OAuth2Client(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/request-password-reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 3600000; // 1 hour

    await db.run(
      "UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?",
      [token, expires, email]
    );

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:8080/reset/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await db.get(
      "SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > ?",
      [token, Date.now()]
    );

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      "UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


// const revokeToken = async (token, userId, reason) => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/revoke-token', {
//       token,
//       userId,
//       reason,
//     });
//     console.log(response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error(error.response.data);
//     } else {
//       console.error("Error occurred but no response received");
//     }
// }};

//revokeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6IiIsImlhdCI6MTcxNzYxMDI2MiwiZXhwIjoxNzE4MjE1MDYyfQ.PkOE8mj3JZdxP8yilK5tovwjXv95PHFGEmIvagJfqaQ', '16', 'Account suspension or ban');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



