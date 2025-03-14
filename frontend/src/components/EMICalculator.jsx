// src/components/EMICalculator.jsx
import { useState } from "react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = loanTenure * 12;
    const emiAmount =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    setEmi(emiAmount.toFixed(2));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">EMI Calculator</h2>
      <input
        type="number"
        placeholder="Loan Amount (₹)"
        className="border p-2 w-full rounded-md"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Annual Interest Rate (%)"
        className="border p-2 w-full rounded-md mt-2"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Loan Tenure (Years)"
        className="border p-2 w-full rounded-md mt-2"
        value={loanTenure}
        onChange={(e) => setLoanTenure(e.target.value)}
      />
      <button
        onClick={calculateEMI}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        Calculate
      </button>
      {emi && <p className="mt-4 font-semibold text-lg">EMI: ₹{emi} per month</p>}
    </div>
  );
};

export default EMICalculator;
