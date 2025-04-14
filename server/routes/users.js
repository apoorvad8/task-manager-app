// server/routes/users.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Dummy in-memory user store (replace with a database like MongoDB in production)
const users = []; 

// Register route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password should be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user (in-memory for now, replace with database)
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    // Create a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ msg: "User registered successfully", token });
  }
);

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ msg: "Login successful", token });
  }
);

module.exports = router;
