// src/context/ExpenseContext.js
import { createContext, useReducer, useContext, useEffect } from "react";

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.payload];
    case "DELETE_EXPENSE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, [], () => {
    const localData = localStorage.getItem("expenses");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{ expenses, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);

// src/pages/ExpenseTracker.jsx
import { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BudgetTracker = () => {
  const { expenses, dispatch } = useExpenseContext();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("other");

  const categories = ["food", "transport", "utilities", "entertainment", "shopping", "other"];

  const addExpense = () => {
    if (title && amount) {
      dispatch({
        type: "ADD_EXPENSE",
        payload: {
          id: Date.now(),
          title,
          amount: Number(amount),
          category,
          date: new Date().toISOString()
        }
      });
      setTitle("");
      setAmount("");
      setCategory("other");
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Budget Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Expense Title"
          className="p-2 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          className="p-2 border rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="p-2 border rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        onClick={addExpense}
      >
        Add Expense
      </button>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Expenses</h3>
          <p className="text-lg font-bold text-purple-600">Total: ₹{totalExpenses}</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} className="border-b">
                  <td className="px-6 py-4">{exp.title}</td>
                  <td className="px-6 py-4">{exp.category}</td>
                  <td className="px-6 py-4">₹{exp.amount}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => dispatch({ type: "DELETE_EXPENSE", payload: exp.id })}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Expense Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenses}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6B46C1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetTracker;
