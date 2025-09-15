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

// GET /api/movies/:id/sales
exports.getTotalPrice = async (req, res) => {
  try {
    const movieId = req.params.id;

    const pipeline = [
      {
        $lookup: {
          from: "showtimes",
          localField: "showtimeId",
          foreignField: "_id",
          as: "showtime",
        },
      },
      { $unwind: "$showtime" },
      { $match: { "showtime.movieId": new mongoose.Types.ObjectId(movieId) } },
      {
        $group: {
          _id: "$showtimeId",
          ticketsSold: { $sum: { $size: "$seats" } }, // count seats
          revenue: { $sum: "$totalPrice" },           // sum booking totalPrice
        },
      },
      {
        $lookup: {
          from: "showtimes",
          localField: "_id",
          foreignField: "_id",
          as: "showtime",
        },
      },
      { $unwind: "$showtime" },
      {
        $project: {
          showtimeId: "$_id",
          ticketsSold: 1,
          revenue: 1,
          startTime: "$showtime.startTime",
          hall: "$showtime.hall",
        },
      },
    ];

    const perShowtime = await Booking.aggregate(pipeline);

    const totals = perShowtime.reduce(
      (acc, cur) => ({
        ticketsSold: acc.ticketsSold + (cur.ticketsSold || 0),
        revenue: acc.revenue + (cur.revenue || 0),
      }),
      { ticketsSold: 0, revenue: 0 }
    );

    res.json({ movieId, totals, breakdown: perShowtime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute sales" });
  }
};
