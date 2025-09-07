const Showtime = require("../models/Showtime");

exports.addShowtime = async (req, res) => {
  try {
    const showtime = new Showtime(req.body);
    await showtime.save();
    res.status(201).json(showtime);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find()
      .populate("movieId", "title genre language")
      .populate("theatreId", "name city");
    res.json(showtimes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

