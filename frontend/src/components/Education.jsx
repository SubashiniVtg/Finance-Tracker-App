import React from 'react';
import { FaGraduationCap, FaBook, FaChartLine, FaPiggyBank } from 'react-icons/fa';

const Education = () => {
  const topics = [
    {
      title: "Basics of Financial Planning",
      icon: FaPiggyBank,
      description: "Learn the fundamentals of managing your money and creating a solid financial plan.",
      modules: ["Budgeting Basics", "Emergency Funds", "Financial Goals Setting"]
    },
    {
      title: "Investment Fundamentals",
      icon: FaChartLine,
      description: "Understand different investment options and strategies for long-term wealth creation.",
      modules: ["Stock Market Basics", "Mutual Funds", "Risk Management"]
    },
    {
      title: "Personal Finance",
      icon: FaBook,
      description: "Master personal finance management and make informed financial decisions.",
      modules: ["Debt Management", "Tax Planning", "Retirement Planning"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Financial Education Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <topic.icon className="text-3xl text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">{topic.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{topic.description}</p>
            <ul className="space-y-2">
              {topic.modules.map((module, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <FaGraduationCap className="text-purple-500 mr-2" />
                  {module}
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;