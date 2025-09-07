const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Signup
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users (admin feature)
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
