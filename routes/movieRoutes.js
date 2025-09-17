// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const {
  addMovie,
  getMovies,
  getMovieById,
  deleteMovie,
} = require("../controllers/movieController");

router.post("/", addMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.delete("/:id", deleteMovie);
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ msg: "Query missing" });
  try {
    const movies = await Movie.find({ title: { $regex: q, $options: "i" } });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
