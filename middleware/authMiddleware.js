const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getMovies, addMovie } = require("../controllers/movieController");

const router = express.Router();

router.get("/", authMiddleware, getMovies); // butuh login
router.post("/", authMiddleware, addMovie); // butuh login

module.exports = router;
