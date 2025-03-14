import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-purple-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Financial Empowerment
        </Link>

        <div className="flex items-center">
          <div className="relative group">
            <Link to="/profile" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <FaUser className="text-xl" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
