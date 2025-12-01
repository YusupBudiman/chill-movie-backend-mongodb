const express = require("express");
const router = express.Router();
// const multer = require("multer");
const { addMedia, getMedia } = require("../controllers/movieController");

// ❌ Multer config
// const upload = multer({ dest: "uploads/" });

// ❌ Upload 2 file
// const uploadFields = upload.fields([
//   { name: "imgLandscape", maxCount: 1 },
//   { name: "imgPortrait", maxCount: 1 },
// ]);

// ✅ Routes TANPA UPLOAD
// router.post("/", uploadFields, addMedia);
router.post("/", addMedia);
router.get("/", getMedia);

module.exports = router;
