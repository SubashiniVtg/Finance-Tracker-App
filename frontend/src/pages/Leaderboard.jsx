import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from backend (or local storage for now)
    const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setUsers(leaderboardData);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 text-center">Leaderboard</h1>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-3/4 mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-2">Rank</th>
              <th className="p-2">User</th>
              <th className="p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.points - a.points)
              .map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{user.name}</td>
                  <td className="p-2 text-center">{user.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
