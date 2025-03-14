import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaGamepad, FaTrophy, FaLightbulb } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import InvestmentTracker from "../components/InvestmentTracker";
import PredictiveAnalytics from "../components/PredictiveAnalysis";
import Quiz from "../components/Quiz";
import Badges from "../components/Badges";
import Leaderboard from "../components/Leaderboard";

const DashboardCard = ({ title, children, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
  >
    <div className="flex items-center mb-4">
      <Icon className="text-2xl text-purple-600 mr-3" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [quizScore, setQuizScore] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [dashboardStats, setDashboardStats] = useState({
    totalSavings: 0,
    savingsGrowth: 0,
    investmentReturns: 0,
    returnsGrowth: 0,
    financialScore: 0,
    scoreStatus: ''
  });

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Calculate dashboard stats from localStorage or other sources
    const calculateDashboardStats = () => {
      const investments = JSON.parse(localStorage.getItem('investments')) || [];
      const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
      const totalReturns = investments.reduce((sum, inv) => sum + (inv.amount * inv.returns / 100), 0);
      
      // Calculate financial score based on investment diversity and amount
      const financialScore = Math.min(
        800,
        500 + (investments.length * 30) + (totalInvestment > 100000 ? 100 : totalInvestment / 1000)
      );

      setDashboardStats({
        totalSavings: totalInvestment,
        savingsGrowth: investments.length > 0 ? 12 : 0,
        investmentReturns: totalReturns,
        returnsGrowth: totalReturns > 0 ? 8 : 0,
        financialScore: Math.round(financialScore),
        scoreStatus: financialScore > 750 ? 'Excellent' : 
                    financialScore > 650 ? 'Good' : 
                    financialScore > 500 ? 'Fair' : 'Needs Improvement'
      });
    };

    calculateDashboardStats();
    // Add event listener for storage changes
    window.addEventListener('storage', calculateDashboardStats);
    return () => window.removeEventListener('storage', calculateDashboardStats);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          {greeting}, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Here's your financial wellness overview</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Total Savings</h3>
          <p className="text-3xl font-bold">₹{dashboardStats.totalSavings.toLocaleString()}</p>
          <p className="text-sm opacity-80">
            {dashboardStats.savingsGrowth > 0 ? `+${dashboardStats.savingsGrowth}% from last month` : 'Start saving!'}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Investment Returns</h3>
          <p className="text-3xl font-bold">₹{dashboardStats.investmentReturns.toLocaleString()}</p>
          <p className="text-sm opacity-80">
            {dashboardStats.returnsGrowth > 0 ? `+${dashboardStats.returnsGrowth}% this quarter` : 'Start investing!'}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Financial Score</h3>
          <p className="text-3xl font-bold">{dashboardStats.financialScore}</p>
          <p className="text-sm opacity-80">{dashboardStats.scoreStatus}</p>
        </motion.div>
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard title="Investment Portfolio" icon={FaChartLine} delay={0.2}>
          <InvestmentTracker />
        </DashboardCard>

        <DashboardCard title="AI Insights" icon={FaLightbulb} delay={0.3}>
          <PredictiveAnalytics />
        </DashboardCard>

        <DashboardCard title="Financial Quiz" icon={FaGamepad} delay={0.4}>
          <div className="grid grid-cols-1 gap-4">
            <Quiz setQuizScore={setQuizScore} />
            <Badges score={quizScore} />
          </div>
        </DashboardCard>

        <DashboardCard title="Achievement Board" icon={FaTrophy} delay={0.5}>
          <Leaderboard score={quizScore} />
        </DashboardCard>
      </div>

      {/* Financial Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-purple-700 mb-4">Today's Financial Tip</h2>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-700">
            💡 Consider setting up an emergency fund that covers 3-6 months of expenses.
            This provides a financial safety net for unexpected situations.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
