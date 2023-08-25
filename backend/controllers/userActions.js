const db = require("../db/db.js");
const User = require("../model/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//this file is ignored in git
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Hash the password
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ name: user.name, email: user.email }, "hello");
    user.token = token;
    await user.save();
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ name: user.name, email: user.email }, "hello");
    user.token = token;
    await user.save();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Assuming you have the user object retrieved from the database
    user.token = "";

    // Save the updated user object
    const finalUser = await user.save();

    res.status(200).json({ finalUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
const getProfile = async (req, res) => {
  try {
    const { token } = req.body;

    // Find the user by email
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  getProfile,
};
