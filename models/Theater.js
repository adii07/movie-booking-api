const mongoose = require("mongoose");
const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    address: { type: String },
});

module.exports = mongoose.model("Theater", theaterSchema);