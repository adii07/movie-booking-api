// controllers/movieController.js
const Movie = require("../models/Movie");

// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all movies (with optional genre filter & search)
exports.getMovies = async (req, res) => {
  try {
    const { genre, search } = req.query;
    let query = {};

    if (genre) query.genre = genre;
    if (search) query.title = { $regex: search, $options: "i" };

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
