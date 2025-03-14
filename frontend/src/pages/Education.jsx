const Education = () => {
  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-purple-700">Financial Education Hub</h1>
      <p className="text-center text-gray-600 mt-2">
        Explore courses and learning materials to master financial literacy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-800">Budgeting 101</h2>
          <p className="text-gray-600">Learn how to manage your budget effectively.</p>
          <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800">Start Now</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-800">Investment Basics</h2>
          <p className="text-gray-600">Understand stocks, mutual funds, and SIPs.</p>
          <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800">Start Now</button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-800">Debt Management</h2>
          <p className="text-gray-600">Tips to stay out of debt and maintain good credit.</p>
          <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800">Start Now</button>
        </div>
      </div>
    </div>
  );
};

export default Education;
