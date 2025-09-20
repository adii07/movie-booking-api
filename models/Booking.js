const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  showtimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
    required: true,
  },
  seats: [{ type: String, required: true }], // e.g. ["A1", "A2"]

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true }, // already present
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  }, // optional but useful
  createdAt: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
});

module.exports = mongoose.model("Booking", bookingSchema);
