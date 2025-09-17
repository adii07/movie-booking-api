const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  stars: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model("Rating", ratingSchema);
