import React, { useState, useContext } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  User,
  BookOpen,
  GraduationCap,
  Home,
  FilePlus,
  UserCheck,
  Users,
  ClipboardCopy,
  CreditCard
} from 'lucide-react';
import { AuthContext } from '../providers/AuthProvider';

export default function DashboardLayout() {
  const { user, role, setRole, profileData, profileCompletion } = useContext(AuthContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'personal';

  // Menus defined per role
  const menuConfigs = {
    Student: [
      { name: 'Profile', path: '/dashboard/profile', icon: User },
      { name: 'My Enroll', path: '/dashboard/my-enroll', icon: BookOpen },
      { name: 'My Orders', path: '/dashboard/my-orders', icon: CreditCard },
    ],
    Teacher: [
      { name: 'Profile', path: '/dashboard/profile', icon: User },
      { name: 'Add Class', path: '/dashboard/add-class', icon: FilePlus },
      { name: 'My Classes', path: '/dashboard/my-classes', icon: BookOpen },
    ],
    Admin: [
      { name: 'Profile', path: '/dashboard/profile', icon: User },
      { name: 'Teacher Requests', path: '/dashboard/admin/teacher-requests', icon: UserCheck },
      { name: 'Users Management', path: '/dashboard/admin/users', icon: Users },
      { name: 'All Classes Audit', path: '/dashboard/admin/all-classes', icon: ClipboardCopy },
    ]
  };

  const normalizedRole = role ? (role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()) : 'Student';
  const menuItems = menuConfigs[normalizedRole] || menuConfigs['Student'];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed left sidebar pinned with the primary color */}
      <aside className="w-64 bg-[#1c3b2f] text-white flex flex-col justify-between fixed h-full left-0 top-0 z-30 shadow-md">
        <div className="overflow-y-auto flex-1">
          {/* Header/Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#e2b74a]" />
              <span className="text-xl font-bold tracking-tight">
                Skilled<span className="text-[#e2b74a]">In</span>
              </span>
            </Link>
          </div>

          {/* Consolidated Profile Metrics Section */}
          <div className="p-6 flex flex-col items-center border-b border-white/10 bg-black/10">
            <div className="relative">
              <img
                src={profileData.avatar || user?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                alt="User avatar placeholder"
                className="w-16 h-16 rounded-full object-cover border border-white/20 shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1c3b2f] rounded-full" />
            </div>
            
            <span className="text-xs font-bold text-white mt-3 truncate max-w-full">
              {profileData.name || user?.displayName || "Active User"}
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
              {role || 'student'}
            </span>

            {/* Profile Completion Progress Bar */}
            <div className="w-full mt-4 space-y-1.5">
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-300">
                <span>Profile Completion</span>
                <span className="text-[#e2b74a]">{profileCompletion}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#e2b74a] to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-4">
            
            {/* Profile Management Submenu */}
            <div className="space-y-0.5">
              <span className="px-3 text-[9px] font-extrabold uppercase tracking-widest text-[#e2b74a]/70 block mb-1.5">
                Profile Management
              </span>
              
              <Link
                to="/dashboard/profile?tab=personal"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-soft text-xs font-bold transition-all ${
                  location.pathname === '/dashboard/profile' && activeTab === 'personal'
                    ? 'bg-[#e2b74a] text-brand-primary shadow-sm'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Personal Details
              </Link>

              <Link
                to="/dashboard/profile?tab=academic"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-soft text-xs font-bold transition-all ${
                  location.pathname === '/dashboard/profile' && activeTab === 'academic'
                    ? 'bg-[#e2b74a] text-brand-primary shadow-sm'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Academic History
              </Link>

              <Link
                to="/dashboard/profile?tab=skills"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-soft text-xs font-bold transition-all ${
                  location.pathname === '/dashboard/profile' && activeTab === 'skills'
                    ? 'bg-[#e2b74a] text-brand-primary shadow-sm'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                Professional & Skills
              </Link>
            </div>

            {/* Other role links */}
            <div className="space-y-0.5">
              <span className="px-3 text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block mb-1.5">
                Console Directory
              </span>
              {menuItems
                .filter(item => item.path !== '/dashboard/profile')
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-soft text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-white/10 text-white border-l-2 border-[#e2b74a]'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      {item.name}
                    </NavLink>
                  );
                })}
            </div>
          </nav>
        </div>

        {/* Footer/Sign Out actions in sidebar */}
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-soft text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Broad right-side panel layout */}
      <div className="flex-1 pl-64 min-h-screen flex flex-col">
        {/* Top Header Placeholder */}
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
          <h1 className="text-lg font-bold text-brand-primary">{normalizedRole} Console</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Switch Persona:</span>
              <select
                value={normalizedRole}
                onChange={(e) => setRole(e.target.value.toLowerCase())}
                className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-soft text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              >
                <option value="Student">Student View</option>
                <option value="Teacher">Teacher View</option>
                <option value="Admin">Admin View</option>
              </select>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <img
              src={(user && user.photoURL) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
              alt="User avatar placeholder"
              className="w-8 h-8 rounded-full object-cover border border-brand-teal/20 shadow-sm"
            />
          </div>
        </header>

        {/* Dashboard Modules Container */}
        <main className="flex-1 p-8 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
