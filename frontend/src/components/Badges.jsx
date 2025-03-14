import { useState } from "react";

const badges = [
  { title: "Beginner Saver", condition: "Score 1 in Quiz", icon: "🥉" },
  { title: "Smart Investor", condition: "Score 2 in Quiz", icon: "🥈" },
  { title: "Financial Guru", condition: "Score 3 in Quiz", icon: "🥇" },
];

const Badges = ({ score }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-4">
      <h3 className="text-xl font-bold">Your Badges</h3>
      <div className="flex space-x-4 mt-2">
        {badges.map((badge, index) => (
          <div key={index} className={`p-2 rounded-lg ${score >= index + 1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"}`}>
            {badge.icon} {badge.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
