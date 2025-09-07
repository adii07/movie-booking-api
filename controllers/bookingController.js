const Booking = require("../models/Booking");
const Showtime = require("../models/Showtime");

exports.createBooking = async (req, res) => {
  try {
    const { userId, showtimeId, seats } = req.body;

    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) return res.status(404).json({ error: "Showtime not found" });

    const totalPrice = seats.length * showtime.price;

    const booking = new Booking({
      userId,
      showtimeId,
      seats,
      totalPrice,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "name email")
    .populate({
      path: "showtimeId",
      populate: [
        { path: "movieId", select: "title" },
        { path: "theatreId", select: "name city" },
      ],
    });

  res.json(bookings);
};
