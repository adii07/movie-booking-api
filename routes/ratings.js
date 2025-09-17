router.post("/:movieId/rate", auth(["user"]), async (req, res) => {
  const { stars } = req.body;
  try {
    const rating = await Rating.create({
      user: req.user.id,
      movie: req.params.movieId,
      stars,
    });
    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
