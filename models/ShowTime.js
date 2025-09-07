const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
    required: true,
  },
  screen: { type: Number, required: true },
  startTime: { type: Date, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Showtime", showtimeSchema);
