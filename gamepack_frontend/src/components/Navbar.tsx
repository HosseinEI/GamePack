import { Link, NavLink } from 'react-router-dom';
import { Gamepad2, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-primary text-white' : 'text-text-muted hover:bg-light-gray hover:text-white'
    }`;

  return (
    <nav className="bg-light-gray/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center text-white font-display text-2xl">
            <Gamepad2 className="h-8 w-8 mr-2 text-primary" />
            GamePack
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/articles" className={navLinkClass}>News</NavLink>
              <NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-text-muted hover:text-white transition-colors">
                  <UserCircle className="h-6 w-6" />
                </Link>
                <button onClick={logout} className="text-text-muted hover:text-white transition-colors">
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;