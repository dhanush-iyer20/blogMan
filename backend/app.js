const express = require("express");
const app = express();
const db = require("./db/db");
require("dotenv").config();
const cors = require("cors");
const user = require("./routes/userRouter");
const posts = require("./routes/postRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, "hello", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    } else {
      req.userId = decoded;
      next();
    }
  });
};
app.use("/api/user", user);
app.use("/api/posts", authenticateToken, posts);
const start = async () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://iyerdhanush4:GV6h5ykIwxxepPKz@cluster0.ebnpmva.mongodb.net/blogman?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("connected to DB");
        app.listen(3000, () =>
          console.log(`Server is listening on port 3000...`)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
};

start();
