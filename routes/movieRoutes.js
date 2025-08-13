const express = require("express");
const { addMovie, getMovies } = require("../controllers/movieController");
const router = express.Router();

router.post("/", addMovie);
router.get("/", getMovies);

module.exports = router;
