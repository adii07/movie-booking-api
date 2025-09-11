const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// Get logged-in user's bookings
router.get("/my-bookings", auth(["user"]), async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("movieId", "title") // only fetch movie title
      .populate("showtimeId", "time") // only fetch showtime
      .sort({ createdAt: -1 }); // latest first

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;