import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChartLine, FaRupeeSign } from 'react-icons/fa';

const InvestmentTracker = () => {
  const [investments, setInvestments] = useState(() => {
    try {
      const savedInvestments = localStorage.getItem('investments');
      return savedInvestments ? JSON.parse(savedInvestments) : [];
    } catch (error) {
      console.error('Error loading investments:', error);
      return [];
    }
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [returns, setReturns] = useState("");
  const [type, setType] = useState("stocks");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem('investments', JSON.stringify(investments));
    } catch (error) {
      console.error('Error saving investments:', error);
    }
  }, [investments]);

  const investmentTypes = ["stocks", "mutual_funds", "fixed_deposits", "real_estate", "crypto"];

  const validateInputs = () => {
    if (!name.trim()) {
      setError("Please enter investment name");
      return false;
    }
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    if (!returns || returns < -100) {
      setError("Please enter valid returns percentage");
      return false;
    }
    setError("");
    return true;
  };

  const addInvestment = () => {
    if (!validateInputs()) return;

    try {
      const newInvestment = {
        id: Date.now(),
        name: name.trim(),
        amount: Number(amount),
        returns: Number(returns),
        type,
        date: new Date().toISOString(),
        projectedValue: Number(amount) * (1 + Number(returns) / 100)
      };
      setInvestments([...investments, newInvestment]);
      // Reset form
      setName("");
      setAmount("");
      setReturns("");
      setType("stocks");
      setError("");
    } catch (error) {
      console.error('Error adding investment:', error);
      setError("Failed to add investment. Please try again.");
    }
  };

  const removeInvestment = (id) => {
    try {
      setInvestments(investments.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error('Error removing investment:', error);
      setError("Failed to remove investment. Please try again.");
    }
  };

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const projectedTotal = investments.reduce((sum, inv) => sum + inv.projectedValue, 0);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Investment Portfolio Tracker</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Investment Name"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="100"
        />
        <input
          type="number"
          placeholder="Expected Returns (%)"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={returns}
          onChange={(e) => setReturns(e.target.value)}
          min="-100"
          max="1000"
          step="0.1"
        />
        <select
          className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {investmentTypes.map(type => (
            <option key={type} value={type}>
              {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={addInvestment}
        className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Add Investment
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Investment</h3>
          <p className="text-2xl font-bold text-purple-600">₹{totalInvestment}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Projected Value</h3>
          <p className="text-2xl font-bold text-green-600">₹{projectedTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Your Investments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Returns</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id} className="border-b">
                  <td className="px-6 py-4">{inv.name}</td>
                  <td className="px-6 py-4">{inv.type}</td>
                  <td className="px-6 py-4">₹{inv.amount}</td>
                  <td className="px-6 py-4">{inv.returns}%</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeInvestment(inv.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Investment Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={investments}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6B46C1" name="Investment Amount" />
            <Bar dataKey="projectedValue" fill="#10B981" name="Projected Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvestmentTracker;
