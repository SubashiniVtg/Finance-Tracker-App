import React, { useState } from 'react';
import { FaWallet, FaPlus } from 'react-icons/fa';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'other'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
      setNewExpense({ description: '', amount: '', category: 'other' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Expense Tracker</h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              placeholder="Description"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              placeholder="Amount"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Expense
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <FaWallet className="text-purple-600" />
                <div>
                  <p className="font-semibold">{expense.description}</p>
                  <p className="text-sm text-gray-600">{expense.category}</p>
                </div>
              </div>
              <p className="font-bold text-purple-600">₹{expense.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
