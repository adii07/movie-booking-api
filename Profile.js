import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
