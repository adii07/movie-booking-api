import { useState } from "react";
import Login from "./Login";
import Profile from "./Profile";
import Movies from "./Movies"; // your existing movies UI

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("movies"); // movies | profile

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <nav className="flex gap-4 bg-gray-200 p-3">
        <button onClick={() => setPage("movies")}>Movies</button>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
          }}
        >
          Logout
        </button>
      </nav>

      {page === "movies" && <Movies />}
      {page === "profile" && <Profile />}
    </div>
  );
}

export default App;
