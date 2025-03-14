import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SIPCalculator from './components/SIPCalculator';
import EMICalculator from './components/EMICalculator';
import Quiz from './components/Quiz';
import ExpenseTracker from './components/ExpenseTracker';
import Education from './components/Education';
import InvestmentTracker from './components/InvestmentTracker';
import PredictiveAnalytics from './components/PredictiveAnalysis';
import Home from './pages/Home'; // Add this import
import Leaderboard from './components/Leaderboard';  // Add this import

function App() {
  const Layout = ({ children }) => (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/" element={<Home />} /> {/* This should now work with the import */}

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Add these new routes */}
          <Route path="/investment-tracker" element={
            <ProtectedRoute>
              <Layout>
                <InvestmentTracker />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/ai-analysis" element={
            <ProtectedRoute>
              <Layout>
                <PredictiveAnalytics />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/sip-calculator" element={
            <ProtectedRoute>
              <Layout>
                <SIPCalculator />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/emi-calculator" element={
            <ProtectedRoute>
              <Layout>
                <EMICalculator />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/quiz" element={
            <ProtectedRoute>
              <Layout>
                <Quiz />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/expense-tracker" element={
            <ProtectedRoute>
              <Layout>
                <ExpenseTracker />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/education" element={
            <ProtectedRoute>
              <Layout>
                <Education />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          {/* Add this new route before the closing Routes tag */}
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Layout>
                <Leaderboard />
              </Layout>
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;
