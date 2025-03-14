import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTrophy, FaMedal } from "react-icons/fa";

const Leaderboard = ({ score }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get existing leaderboard data
    const existingData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    // Update current user's score if provided
    if (score && user) {
      const userIndex = existingData.findIndex(u => u.id === user.id);
      if (userIndex >= 0) {
        existingData[userIndex].points = Math.max(existingData[userIndex].points, score);
      } else {
        existingData.push({
          id: user.id,
          name: user.name,
          points: score
        });
      }
      localStorage.setItem("leaderboard", JSON.stringify(existingData));
    }

    setUsers(existingData);
  }, [score, user]);

  const getRankStyle = (index) => {
    switch(index) {
      case 0: return "bg-yellow-100 text-yellow-800";
      case 1: return "bg-gray-100 text-gray-800";
      case 2: return "bg-orange-100 text-orange-800";
      default: return "bg-white";
    }
  };

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <FaTrophy className="text-yellow-500" />;
      case 1: return <FaTrophy className="text-gray-500" />;
      case 2: return <FaTrophy className="text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Top Performers</h2>
      
      {users.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          Complete quizzes to appear on the leaderboard!
        </div>
      ) : (
        <div className="space-y-4">
          {users
            .sort((a, b) => b.points - a.points)
            .slice(0, 10)
            .map((user, index) => (
              <div
                key={`${user.id}-${index}`} // Make the key more unique
                className={`flex items-center justify-between p-4 rounded-lg ${getRankStyle(index)} transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 text-center font-bold">
                    {getRankIcon(index) || `#${index + 1}`}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMedal className="text-purple-500" />
                  <span className="font-bold">{user.points}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
