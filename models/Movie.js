// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  language: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  releaseDate: { type: Date, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 }, // IMDb-like rating
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicate movies: title + releaseDate must be unique
movieSchema.index({ title: 1, releaseDate: 1 }, { unique: true });

module.exports = mongoose.model("Movie", movieSchema);
