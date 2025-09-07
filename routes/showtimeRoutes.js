const express = require("express");
const {
  addShowtime,
  getShowtimes,
} = require("../controllers/showtimeController");
const router = express.Router();

router.post("/", addShowtime);
router.get("/", getShowtimes);

module.exports = router;
