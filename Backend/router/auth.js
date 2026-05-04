const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
router.post("/register", async (req, res) => {
  const { name, username, whatsapp, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      whatsapp,
      password: hashed,
    });

    await user.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, username: user.username, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
    console.log(username + ' logged in');
    
  } catch (err) {
    res.status(500).json({ message: "Login error" });
    console.log(err);
    
  }
});

module.exports = router;