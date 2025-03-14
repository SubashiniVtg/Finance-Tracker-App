import { useState } from 'react';
import { FaCalculator, FaInfoCircle } from 'react-icons/fa';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [years, setYears] = useState('');
  const [futureValue, setFutureValue] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const calculateSIP = () => {
    if (!monthlyInvestment || !annualReturn || !years) {
      alert('Please fill in all fields');
      return;
    }

    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / (12 * 100); // Monthly rate
    const n = parseFloat(years) * 12; // Total months

    // SIP Future Value formula: P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    const futureVal = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setFutureValue(Math.round(futureVal));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-700">SIP Calculator</h2>
          <button
            className="text-purple-600 hover:text-purple-800"
            onClick={() => setShowInfo(!showInfo)}
          >
            <FaInfoCircle size={24} />
          </button>
        </div>

        {showInfo && (
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-purple-800">
              A Systematic Investment Plan (SIP) helps you invest a fixed amount regularly in mutual funds.
              This calculator helps you estimate the future value of your SIP investments.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Monthly Investment Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₹</span>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                className="w-full p-3 pl-8 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter amount"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Expected Annual Return (%)</label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter expected return"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Investment Period (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter time period"
              min="1"
              max="50"
            />
          </div>

          <button
            onClick={calculateSIP}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaCalculator />
            Calculate
          </button>

          {futureValue && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Results</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Total Investment: {formatCurrency(monthlyInvestment * years * 12)}
                </p>
                <p className="text-gray-700">
                  Expected Future Value: {formatCurrency(futureValue)}
                </p>
                <p className="text-gray-700">
                  Wealth Gained: {formatCurrency(futureValue - (monthlyInvestment * years * 12))}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
