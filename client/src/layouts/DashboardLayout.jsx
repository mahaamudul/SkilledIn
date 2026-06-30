import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  User,
  BookOpen,
  GraduationCap,
  Home,
  FilePlus,
  UserCheck,
  Users,
  ClipboardCopy
} from 'lucide-react';

export default function DashboardLayout() {
  const [role, setRole] = useState('Student');

  // Menus defined per role
  const menuConfigs = {
    Student: [
      { name: 'Profile', path: '/dashboard/profile', icon: User },
      { name: 'My Enroll', path: '/dashboard/my-enroll', icon: BookOpen },
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

  const menuItems = menuConfigs[role];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed left sidebar pinned with the primary color */}
      <aside className="w-64 bg-[#1c3b2f] text-white flex flex-col justify-between fixed h-full left-0 top-0 z-30 shadow-md">
        <div>
          {/* Header/Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#e2b74a]" />
              <span className="text-xl font-bold tracking-tight">
                Skilled<span className="text-[#e2b74a]">In</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-soft text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#e2b74a] text-brand-primary shadow-sm'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              );
            })}
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
          <h1 className="text-lg font-bold text-brand-primary">{role} Console</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Switch Persona:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-soft text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
              >
                <option value="Student">Student View</option>
                <option value="Teacher">Teacher View</option>
                <option value="Admin">Admin View</option>
              </select>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
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
