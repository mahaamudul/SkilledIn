import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Classes', path: '/all-classes' },
    { name: 'Teach on SkilledIn', path: '/teach' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
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

            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 group"
                title="Go to Dashboard"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Student Avatar Profile"
                  className="w-8 h-8 rounded-full object-cover border border-brand-teal/20 shadow-sm group-hover:border-brand-teal group-hover:scale-105 transition-all"
                />
                <span className="text-xs font-semibold text-slate-650 group-hover:text-brand-primary">Dashboard</span>
              </Link>
              <Link
                to="/login"
                className="px-4.5 py-2 bg-[#e2b74a] text-brand-primary font-bold text-xs rounded-soft shadow-sm hover:bg-[#e2b74a]/90 hover:scale-[1.02] transition-all"
              >
                Sign In
              </Link>
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
            <Link
              to="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Student Avatar Profile"
                className="w-9 h-9 rounded-full object-cover border border-brand-teal/20"
              />
              <span className="text-sm font-semibold text-slate-700">Dashboard Console</span>
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 bg-[#e2b74a] text-brand-primary font-bold text-sm rounded-soft shadow-sm hover:bg-[#e2b74a]/90"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
