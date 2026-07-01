import React, { useContext } from 'react';
import { User, Mail, Phone, Shield, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';

export default function Profile() {
  const { user, role } = useContext(AuthContext);

  const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-primary">My Profile View</h2>
        <p className="text-slate-500 text-xs font-semibold">Manage your personal identification details and platform authority levels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Premium User ID Pass card */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-soft shadow-md hover:shadow-xl hover:border-brand-teal/20 transition-all duration-300 relative overflow-hidden flex flex-col items-center p-8 text-center group">
          {/* Top colored strip background */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary via-brand-teal to-brand-secondary" />
          
          <div className="relative mt-4">
            <img
              src={(user && user.photoURL) || defaultAvatar}
              alt="Active profile avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-brand-teal/30 shadow-inner group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-brand-primary mt-5">
            {(user && user.displayName) || "Active User"}
          </h3>
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-teal/10 text-brand-teal border border-brand-teal/20 mt-2.5 uppercase">
            <Shield className="w-3.5 h-3.5 text-brand-secondary" />
            {role || 'student'}
          </span>

          <div className="w-full border-t border-slate-100 mt-6 pt-6 space-y-3.5 text-left text-xs text-slate-500">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-400">ID Credentials</span>
              <span className="font-bold text-slate-700">#SK-1782-99</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-400">Issued Authority</span>
              <span className="font-bold text-slate-700">SkilledIn Console</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-400">Security Clearance</span>
              <span className="font-bold text-slate-700">JSON Web Token</span>
            </div>
          </div>
        </div>

        {/* Right Side: Account Details Grid */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-soft p-8 shadow-md hover:shadow-lg transition-all duration-300 space-y-6">
          <h3 className="font-bold text-brand-primary border-b border-slate-100 pb-3">Personal Credentials</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 text-brand-teal border border-slate-100 rounded-soft">
                <User className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Full Name</p>
                <p className="text-sm font-semibold text-slate-750">
                  {(user && user.displayName) || "Active User Profile"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 text-brand-teal border border-slate-100 rounded-soft">
                <Mail className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Email Address</p>
                <p className="text-sm font-semibold text-slate-750">
                  {(user && user.email) || "user@skilledin.com"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 text-brand-teal border border-slate-100 rounded-soft">
                <Phone className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Phone Number</p>
                <p className="text-sm font-semibold text-slate-750">+1 (555) 019-2834</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 text-brand-teal border border-slate-100 rounded-soft">
                <Calendar className="w-4 h-4 text-brand-teal" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Registration Date</p>
                <p className="text-sm font-semibold text-slate-750">June 30, 2026</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-brand-secondary" />
            <span className="text-xs text-slate-500 font-semibold leading-relaxed">
              Your profile verification details are synchronized securely with our backend server database.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
