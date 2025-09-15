import React, { useEffect, useState } from "react";

export default function MovieSalesPanel({ movieId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    fetch(`/api/movies/${movieId}/sales`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sales data");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (!movieId) return <p className="p-4">Select a movie to view sales</p>;
  if (loading) return <p className="p-4">Loading sales...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!data) return null;

  const { totals, breakdown } = data;

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">🎟 Ticket Sales</h2>

      <div className="mb-4">
        <p>
          <strong>Total Tickets Sold:</strong> {totals.ticketsSold}
        </p>
        <p>
          <strong>Total Revenue:</strong> ₹{totals.revenue.toLocaleString()}
        </p>
      </div>

      <h3 className="text-lg font-medium mb-1">Showtime Breakdown</h3>
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Showtime</th>
            <th className="p-2 text-left">Hall</th>
            <th className="p-2 text-right">Tickets Sold</th>
            <th className="p-2 text-right">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {breakdown && breakdown.length > 0 ? (
            breakdown.map((b) => (
              <tr key={b.showtimeId} className="border-t">
                <td className="p-2">
                  {b.startTime
                    ? new Date(b.startTime).toLocaleString()
                    : "N/A"}
                </td>
                <td className="p-2">{b.hall || "N/A"}</td>
                <td className="p-2 text-right">{b.ticketsSold}</td>
                <td className="p-2 text-right">
                  ₹{(b.revenue || 0).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 text-center text-gray-500">
                No sales yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
