const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

router.get("/", getUsers);

module.exports = router;
