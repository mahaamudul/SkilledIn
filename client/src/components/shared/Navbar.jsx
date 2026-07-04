import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../providers/AuthProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Classes', path: '/all-classes' },
    { name: 'Teach on SkilledIn', path: '/teach' },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";

  return (
    <nav className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
      isScrolled
        ? 'bg-white/50 backdrop-blur-md border-b border-slate-200/50 shadow-sm'
        : 'bg-white border-b border-slate-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-primary text-white rounded-soft">
                <GraduationCap className="w-6 h-6 text-brand-secondary" />
              </div>
              <span className="text-xl font-bold text-brand-primary tracking-tight">
                Skilled<span className="text-brand-secondary">In</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-brand-teal border-b-2 border-brand-teal pb-1'
                      : 'text-slate-600 hover:text-brand-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none group p-1 rounded-full hover:bg-slate-50 transition-all"
                  >
                    <img
                      src={user.photoURL || defaultAvatar}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-brand-teal/20 shadow-sm group-hover:border-brand-teal group-hover:scale-105 transition-all"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-primary transition-transform duration-200" />
                  </button>

                  {/* Absolute Positioned Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <>
                        {/* Overlay backdrop to close dropdown */}
                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-150 rounded-soft shadow-xl py-2 z-20 text-left overflow-hidden"
                        >
                          {/* User Name - Non-clickable label */}
                          <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Authenticated as</span>
                            <span className="block text-sm font-bold text-brand-primary mt-0.5 truncate">
                              {user.displayName || "Active User"}
                            </span>
                          </div>
                          
                          {/* Clickable links */}
                          <Link
                            to="/dashboard/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-655 hover:bg-slate-50 hover:text-brand-primary transition-all"
                          >
                            <LayoutDashboard className="w-4 h-4 text-brand-teal" />
                            Dashboard
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-655 hover:bg-red-50/50 transition-all border-t border-slate-100"
                          >
                            <LogOut className="w-4 h-4 text-red-500" />
                            Logout
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4.5 py-2 bg-[#e2b74a] text-brand-primary font-bold text-xs rounded-soft shadow-sm hover:bg-[#e2b74a]/90 hover:scale-[1.02] transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-brand-primary hover:bg-slate-50 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-2 text-left">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-soft text-base font-semibold ${
                  isActive
                    ? 'bg-brand-teal/10 text-brand-teal'
                    : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-slate-100 px-3 space-y-3">
            {user ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 rounded-soft border border-slate-100">
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt={user.displayName || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-brand-teal/20"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-400">Authenticated</span>
                    <span className="block text-sm font-bold text-slate-700 leading-none mt-0.5 truncate">
                      {user.displayName || "Active User"}
                    </span>
                  </div>
                </div>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-soft"
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-teal" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-red-655 hover:bg-red-50/50 rounded-soft text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2.5 bg-[#e2b74a] text-brand-primary font-bold text-sm rounded-soft shadow-sm hover:bg-[#e2b74a]/90"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
