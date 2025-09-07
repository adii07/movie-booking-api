const Theatre = require("../models/Theatre");

exports.addTheatre = async (req, res) => {
  try {
    const theatre = new Theatre(req.body);
    await theatre.save();
    res.status(201).json(theatre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTheatres = async (req, res) => {
  const theatres = await Theatre.find();
  res.json(theatres);
};
