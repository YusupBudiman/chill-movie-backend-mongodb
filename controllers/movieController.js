const Media = require("../models/Media");
// const cloudinary = require("../utils/cloudinary");

// =========================
// Add Media Controller
// =========================
const addMedia = async (req, res) => {
  try {
    // =========================
    // Parsing genre
    // =========================
    let genre = [];
    if (req.body.genre) {
      if (typeof req.body.genre === "string") {
        genre = req.body.genre.split(",").map((g) => g.trim());
      } else if (Array.isArray(req.body.genre)) {
        genre = req.body.genre;
      }
    }

    // =========================
    // Parsing cast
    // =========================
    let cast = [];
    if (req.body.cast) {
      if (typeof req.body.cast === "string") {
        cast = req.body.cast.split(",").map((c) => c.trim());
      } else if (Array.isArray(req.body.cast)) {
        cast = req.body.cast;
      }
    }

    // =========================
    // Parsing seasons (untuk series)
    // =========================
    let seasons = [];
    if (req.body.seasons && Array.isArray(req.body.seasons)) {
      seasons = req.body.seasons.map((s) => ({
        seasonNumber: s.seasonNumber || 1,
        airDate: s.airDate ? new Date(s.airDate) : null,
        endDate: s.endDate ? new Date(s.endDate) : null,
        episodes: Array.isArray(s.episodes)
          ? s.episodes.map((e) => ({
              episodeNumber: e.episodeNumber || 1,
              title: e.title || "",
              airDate: e.airDate ? new Date(e.airDate) : null,
              duration: e.duration || 0,
              video: e.video || "",
            }))
          : [],
      }));
    }

    // =========================
    // ❌ UPLOAD FILE DIMATIKAN TOTAL
    // ❌ Tidak ada req.file / req.files
    // ❌ Tidak ada cloudinary upload
    // =========================

    // =========================
    // Buat Media baru
    // =========================
    const media = await Media.create({
      title: req.body.title,
      type: req.body.type || "movie",
      description: req.body.description || "",
      year: req.body.year,
      genre,
      cast,
      director: req.body.director || "",
      duration: req.body.duration || 0,
      studio: req.body.studio || "",
      seasons,
      streaming: req.body.streaming || [],

      // ✅ Sekarang hanya terima URL/string dari frontend
      imgLandscape: req.body.imgLandscape || "",
      imgPortrait: req.body.imgPortrait || "",

      video: req.body.video || "",
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// =========================
// Get All Media Controller
// =========================
const getMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMedia, getMedia };
