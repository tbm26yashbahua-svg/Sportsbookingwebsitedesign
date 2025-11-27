import { Link, useLocation } from 'react-router-dom';
import { User as UserIcon, Menu, LogOut, Calendar, Settings } from 'lucide-react';
import { useState } from 'react';
import { User, signOut } from '../utils/auth';

interface HeaderProps {
  user: User | null;
  onAuthClick: () => void;
}

export function Header({ user, onAuthClick }: HeaderProps) {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      setShowUserMenu(false);
      window.location.href = '/';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⚽</span>
            </div>
            <span className="text-2xl text-gray-900">SportHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/sports" 
              className={`transition-colors ${isActive('/sports') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Sports
            </Link>
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/venues') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Venues
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth & User */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Logged in user menu
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-gray-900">{user.name || user.email.split('@')[0]}</span>
                </button>
                
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-900">{user.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link 
                        to="/admin/stats" 
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Calendar className="w-4 h-4 mr-3" />
                        My Bookings
                      </Link>
                      <a 
                        href="#" 
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </a>
                      <hr className="my-2" />
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Not logged in
              <>
                <button 
                  onClick={onAuthClick}
                  className="hidden md:block px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={onAuthClick}
                  className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile Menu */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link to="/sports" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Sports
              </Link>
              <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Venues
              </Link>
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                About
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Contact
              </a>
              {!user && (
                <>
                  <button 
                    onClick={onAuthClick}
                    className="mx-4 px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={onAuthClick}
                    className="mx-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}