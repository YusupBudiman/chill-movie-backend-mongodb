const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["movie", "series"], default: "movie" },
    description: { type: String, default: "" },
    year: { type: Number },
    genre: { type: [String], default: [] },
    like: { type: Number, default: 0 },
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        score: { type: Number, min: 1, max: 5 },
      },
    ],
    cast: [{ type: String }],
    director: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    studio: { type: String, default: "" },
    seasons: [
      {
        seasonNumber: { type: Number },
        airDate: { type: Date },
        endDate: { type: Date },
        episodes: [
          {
            episodeNumber: { type: Number, required: true },
            title: { type: String, default: "" },
            airDate: { type: Date },
            duration: { type: Number, default: 0 },
            video: { type: String, default: "" },
          },
        ],
      },
    ],

    streaming: [{ type: String }],
    imgLandscape: { type: String, default: "" },
    imgPortrait: { type: String, default: "" },
    video: { type: String, default: "" },
  },
  { timestamps: true, collection: "media" }
);

module.exports = mongoose.model("Media", mediaSchema);
