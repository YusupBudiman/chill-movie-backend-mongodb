const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addMedia, getMedia } = require("../controllers/movieController");

// Multer config: upload sementara ke folder "uploads/"
const upload = multer({ dest: "uploads/" });

// Upload 2 file sekaligus: imgLandscape dan imgPortrait
const uploadFields = upload.fields([
  { name: "imgLandscape", maxCount: 1 },
  { name: "imgPortrait", maxCount: 1 },
]);

// Routes
router.post("/", uploadFields, addMedia);
router.get("/", getMedia);

module.exports = router;
