const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Showtime = require("../models/Showtime");
const auth = require("../middleware/auth");

// ✅ Reserve seats (create booking)
router.post("/bookings", auth(["user"]), async (req, res) => {
  try {
    const { showtimeId, seats } = req.body;

    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) return res.status(404).json({ msg: "Showtime not found" });

    // simple seat availability check (can be extended)
    const alreadyBooked = await Booking.find({
      showtime: showtimeId,
      seats: { $in: seats },
    });
    if (alreadyBooked.length > 0) {
      return res.status(400).json({ msg: "Some seats already booked" });
    }

    const booking = new Booking({
      user: req.user.id,
      showtime: showtimeId,
      seats,
    });
    await booking.save();

    res.json({ msg: "Booking created, pending payment", booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Get booking details
router.get("/bookings/:id", auth(["user", "admin"]), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("showtime");
    if (!booking) return res.status(404).json({ msg: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Mock payment (updates status)
router.post("/bookings/:id/pay", auth(["user"]), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ msg: "Already paid" });
    }

    // simulate payment success
    booking.paymentStatus = "paid";
    booking.status = "confirmed";
    await booking.save();

    res.json({ msg: "Payment successful, booking confirmed", booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});
