import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaChartLine, FaSave, FaCamera } from 'react-icons/fa';

const Profile = () => {
  const { user, token, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    occupation: user?.occupation || '',
    investmentGoal: user?.investmentGoal || '₹0',
    riskTolerance: user?.riskTolerance || 'Moderate',
    profileImage: user?.profileImage || 'https://ui-avatars.com/api/?name=' + (user?.fullName || 'User')
  });

  // Get investment statistics
  const [stats, setStats] = useState({
    totalInvestments: '₹0',
    portfolioGrowth: '0%',
    activeInvestments: '0',
    achievedGoals: '0'
  });

  useEffect(() => {
    // Update stats based on actual investments
    const investments = JSON.parse(localStorage.getItem('investments')) || [];
    const totalAmount = investments.reduce((sum, inv) => sum + Number(String(inv.amount).replace(/[₹,]/g, '')), 0);
    const activeCount = investments.length;
    
    setStats({
      totalInvestments: `₹${totalAmount.toLocaleString()}`,
      portfolioGrowth: calculatePortfolioGrowth(investments),
      activeInvestments: activeCount.toString(),
      achievedGoals: calculateAchievedGoals(investments, user?.investmentGoal).toString()
    });
  }, [user]);

  const calculatePortfolioGrowth = (investments) => {
    const totalReturns = investments.reduce((sum, inv) => {
      const returnValue = Number(String(inv.returns).replace('%', '')) || 0;
      return sum + returnValue;
    }, 0);
    const averageReturn = investments.length > 0 ? totalReturns / investments.length : 0;
    return `${averageReturn > 0 ? '+' : ''}${averageReturn.toFixed(1)}%`;
  };

  const calculateAchievedGoals = (investments, goal) => {
    if (!goal) return 0;
    const targetAmount = Number(String(goal).replace(/[₹,]/g, ''));
    const totalAmount = investments.reduce((sum, inv) => sum + Number(String(inv.amount).replace(/[₹,]/g, '')), 0);
    return Math.floor((totalAmount / targetAmount) * 3); // Assuming 3 milestone levels
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profileImage: reader.result }));
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Create form data if there's an image
      const formData = new FormData();
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      
      // Add other profile data
      Object.keys(profileData).forEach(key => {
        if (key !== 'profileImage' || !imageFile) {
          formData.append(key, profileData[key]);
        }
      });

      await updateProfile(formData);
      setIsEditing(false);
      setImageFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Update the image upload button in the JSX
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-purple-600 to-purple-900">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white cursor-pointer hover:bg-purple-700 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <FaCamera className="text-lg" />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{profileData.fullName}</h1>
              <p className="text-gray-600">{profileData.occupation}</p>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isEditing ? <><FaSave /> Save</> : <><FaEdit /> Edit Profile</>}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="bg-purple-50 p-4 rounded-xl">
                <h3 className="text-sm text-purple-600 font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <p className="text-2xl font-bold text-purple-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              {[
                { icon: FaUser, label: 'Full Name', value: profileData.fullName },
                { icon: FaEnvelope, label: 'Email', value: profileData.email },
                { icon: FaPhone, label: 'Phone', value: profileData.phone }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <item.icon className="text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => setProfileData({ ...profileData, [item.label.toLowerCase()]: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Profile</h2>
              {[
                { icon: FaChartLine, label: 'Investment Goal', value: profileData.investmentGoal },
                { icon: FaChartLine, label: 'Risk Tolerance', value: profileData.riskTolerance }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <item.icon className="text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => setProfileData({ ...profileData, [item.label.toLowerCase().replace(' ', '')]: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
