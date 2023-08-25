const express = require("express");
const router = express.Router();
const {
  addUser,
  loginUser,
  logoutUser,
  getProfile,
} = require("../controllers/userActions");
router.route("/register").post(addUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").post(getProfile);
module.exports = router;
