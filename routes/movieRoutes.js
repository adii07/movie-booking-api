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

module.exports = router;
