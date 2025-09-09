// models/Movie.js
const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theater: { type: String, required: true },
  startTime: { type: Date, required: true },

  seats: [
    {
      seatNumber: String, // A1, A2, etc.
      status: {
        type: String,
        enum: ["available", "reserved", "booked"],
        default: "available",
      },
    },
  ],
});

// Prevent duplicate movies: title + releaseDate must be unique
movieSchema.index({ title: 1, releaseDate: 1 }, { unique: true });

module.exports = mongoose.model("Movie", movieSchema);
