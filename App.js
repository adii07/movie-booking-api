import { useEffect, useState } from "react";
import axios from "axios";

export default function MoviesApp() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies"); // adjust port if 3030
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

  // Add new movie
  const addMovie = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/movies", { title });
      setTitle("");
      fetchMovies(); // refresh list
    } catch (err) {
      console.error("Error adding movie", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">🎬 Movies App</h1>

      {/* Add Movie Form */}
      <form
        onSubmit={addMovie}
        className="flex gap-2 mb-6 bg-white p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Movies List */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Movie List</h2>
        {movies.length === 0 ? (
          <p className="text-gray-500">No movies yet.</p>
        ) : (
          <ul className="space-y-2">
            {movies.map((m) => (
              <li key={m._id} className="border-b pb-2 last:border-none">
                {m.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
