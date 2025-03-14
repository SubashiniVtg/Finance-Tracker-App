import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaRobot, FaChartLine, FaInfoCircle, FaLightbulb, FaSearch, FaExchangeAlt } from 'react-icons/fa';

const InvestmentAnalysis = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [riskScore, setRiskScore] = useState(75);
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  // Simulate real market data fetching
  useEffect(() => {
    generateMarketData();
  }, []);

  const generateMarketData = () => {
    const startValue = 1000;
    const volatility = 0.02; // 2% daily volatility
    const data = [];
    let currentValue = startValue;

    for (let i = 0; i < 180; i++) { // 6 months of daily data
      const randomChange = (Math.random() - 0.5) * 2 * volatility;
      currentValue = currentValue * (1 + randomChange);
      
      data.push({
        date: new Date(Date.now() - (180 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        value: currentValue.toFixed(2)
      });
    }
    setMarketData(data);
  };

  const portfolioDistribution = [
    { name: 'Large Cap Stocks', value: 35, growth: '+8.5%' },
    { name: 'Mid Cap Stocks', value: 25, growth: '+12.3%' },
    { name: 'Government Bonds', value: 20, growth: '+4.2%' },
    { name: 'Corporate Bonds', value: 15, growth: '+6.1%' },
    { name: 'Cash Equivalents', value: 5, growth: '+2.1%' }
  ];

  const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6'];

  const generateAIInsights = () => {
    const marketTrend = marketData[marketData.length - 1]?.value > marketData[0]?.value;
    const volatilityHigh = Math.random() > 0.5;
    
    return [
      `Market Analysis: ${marketTrend ? 'Bullish trend detected' : 'Bearish trend observed'} in recent market movements`,
      `Risk Assessment: ${volatilityHigh ? 'High' : 'Moderate'} market volatility suggests ${volatilityHigh ? 'defensive positioning' : 'strategic opportunities'}`,
      `Portfolio Recommendation: Consider ${marketTrend ? 'increasing' : 'decreasing'} exposure to growth assets`,
      `Sector Rotation: ${volatilityHigh ? 'Defensive sectors' : 'Cyclical sectors'} showing strength`,
      `Asset Allocation: Current distribution aligns ${Math.random() > 0.5 ? 'well' : 'moderately'} with your risk profile`
    ];
  };

  const [aiInsights, setAiInsights] = useState(generateAIInsights());

  const analyzeInvestment = async () => {
    setLoading(true);
    try {
      // Simulate API call and data processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAiInsights(generateAIInsights());
      generateMarketData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-purple-700 flex items-center justify-center gap-2">
          <FaRobot className="text-2xl" />
          AI Investment Analysis
        </h1>
        <p className="text-gray-600 mt-2">Real-time market analysis & recommendations</p>
      </motion.div>

      {/* Market Analysis Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={analyzeInvestment}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          disabled={loading}
        >
          <FaSearch /> {loading ? 'Analyzing...' : 'Analyze Market'}
        </button>
        <button
          onClick={() => setRiskScore(prev => Math.min(100, prev + 5))}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Increase Risk Tolerance
        </button>
        <button
          onClick={() => setRiskScore(prev => Math.max(0, prev - 5))}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Decrease Risk Tolerance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaChartLine />
            Portfolio Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {portfolioDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {portfolioDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span>{item.name}</span>
                </div>
                <span className={`font-semibold ${item.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {item.growth}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaLightbulb />
            AI Insights
          </h2>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg"
              >
                <FaInfoCircle className="text-purple-600 mt-1" />
                <p className="text-gray-700">{insight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4">Market Trends Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketData}>
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Risk Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaExchangeAlt />
          Risk Analysis Score
        </h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                Risk Tolerance Level
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-purple-600">
                {riskScore}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
            <div
              style={{ width: `${riskScore}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500"
            />
          </div>
          <p className="text-sm text-gray-600">
            {riskScore < 30 ? 'Conservative' : riskScore < 70 ? 'Moderate' : 'Aggressive'} investment strategy recommended
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InvestmentAnalysis;
