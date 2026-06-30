import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import { GraduationCap } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#f8fafc]">
        <Outlet />
      </main>
      <footer className="bg-[#1c3b2f] text-white py-12 border-t border-brand-teal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-soft">
                <GraduationCap className="w-6 h-6 text-brand-secondary" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Skilled<span className="text-brand-secondary">In</span>
              </span>
            </div>
            <p className="text-sm text-slate-300">
              &copy; {new Date().getFullYear()} SkilledIn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
