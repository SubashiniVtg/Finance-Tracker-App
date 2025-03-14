import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaGraduationCap, 
  FaChartLine, 
  FaWallet, 
  FaCalculator, 
  FaBrain,
  FaGamepad,
  FaTrophy,
  FaUser,
  FaLightbulb
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const MenuItem = ({ to, icon: Icon, children }) => (
    <motion.li whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
      <Link 
        to={to} 
        className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
          isActiveRoute(to) 
            ? 'bg-purple-600 text-white shadow-lg' 
            : 'hover:bg-purple-700/50 text-purple-100'
        }`}
      >
        <Icon className={`mr-3 text-lg ${isActiveRoute(to) ? 'text-white' : 'text-purple-300'}`} />
        <span className="font-medium text-purple-100">{children}</span>
      </Link>
    </motion.li>
  );

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm font-semibold text-purple-300 mb-2 px-3 flex items-center">
      <span className="flex-grow">{children}</span>
      <motion.div className="h-[1px] bg-purple-600/50 flex-grow ml-2" />
    </h3>
  );

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-gradient-to-b from-purple-900 to-purple-800 text-white w-64 min-h-screen p-4 shadow-xl"
    >
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center space-x-3 mb-8 bg-purple-700/30 p-4 rounded-lg"
      >
        <FaLightbulb className="text-2xl text-yellow-400" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-100 bg-clip-text text-transparent">
          Financial Empowerment
        </h2>
      </motion.div>

      <div className="space-y-6">
        <MenuItem to="/dashboard" icon={FaHome}>Dashboard</MenuItem>

        <div>
          <SectionTitle>LEARN & GROW</SectionTitle>
          <ul className="space-y-1">
            <MenuItem to="/education" icon={FaGraduationCap}>Financial Education</MenuItem>
            <MenuItem to="/quiz" icon={FaGamepad}>Financial Quiz</MenuItem>
          </ul>
        </div>

        <div>
          <SectionTitle>TRACK & MANAGE</SectionTitle>
          <ul className="space-y-1">
            <MenuItem to="/expense-tracker" icon={FaWallet}>Budget & Expenses</MenuItem>
            <MenuItem to="/investment-tracker" icon={FaChartLine}>Investment Portfolio</MenuItem>
          </ul>
        </div>

        <div>
          <SectionTitle>SMART TOOLS</SectionTitle>
          <ul className="space-y-1">
            <MenuItem to="/emi-calculator" icon={FaCalculator}>EMI Calculator</MenuItem>
            <MenuItem to="/sip-calculator" icon={FaCalculator}>SIP Calculator</MenuItem>
            <MenuItem to="/ai-analysis" icon={FaBrain}>AI Investment Insights</MenuItem>
          </ul>
        </div>

        <div>
          <SectionTitle>COMMUNITY</SectionTitle>
          <ul className="space-y-1">
            <MenuItem to="/leaderboard" icon={FaTrophy}>Achievement Board</MenuItem>
            <MenuItem to="/profile" icon={FaUser}>My Profile</MenuItem>
          </ul>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-purple-700/20 rounded-lg"
      >
        <p className="text-sm text-purple-200 text-center">
          Track • Learn • Grow
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
  