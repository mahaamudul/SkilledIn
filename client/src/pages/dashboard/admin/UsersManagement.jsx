import React, { useState } from 'react';
import { Search, UserPlus, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export default function UsersManagement() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: "Liam Henderson", email: "liam@example.com", role: "Student" },
    { id: 2, name: "Sarah Jenkins", email: "sarah@example.com", role: "Teacher" },
    { id: 3, name: "David Chen", email: "david@example.com", role: "Teacher" },
    { id: 4, name: "Amanda Vance", email: "amanda@example.com", role: "Admin" },
  ]);

  const handleMakeAdmin = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: 'Admin' } : u))
    );
    alert('User promoted to Admin role!');
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary">Platform Users Management</h2>
          <p className="text-slate-500 text-xs">Search accounts and configure authorization clearances.</p>
        </div>

        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-xs transition-all shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-650 border-collapse">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-455 border-b border-slate-150">
              <tr>
                <th className="px-6 py-4.5 text-left font-bold">User Profile Details</th>
                <th className="px-6 py-4.5 text-left font-bold">Registered Email</th>
                <th className="px-6 py-4.5 text-center font-bold">System Clearance</th>
                <th className="px-6 py-4.5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {filteredUsers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-brand-primary text-sm">{item.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500 font-semibold">{item.email}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold ${
                      item.role === 'Admin'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-sm'
                        : item.role === 'Teacher'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
                    }`}>
                      <Shield className="w-3.5 h-3.5 stroke-[1.5]" />
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleMakeAdmin(item.id)}
                      disabled={item.role === 'Admin'}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-soft bg-brand-primary text-white hover:bg-brand-primary/95 disabled:bg-slate-100 disabled:text-slate-400 hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1.5 ml-auto shadow-sm"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-brand-secondary" />
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sleek, responsive Pagination Footer UI layout component */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">
            Showing <strong className="text-brand-primary">1-{filteredUsers.length}</strong> of <strong className="text-brand-primary">{filteredUsers.length}</strong> users
          </span>
          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="p-1.5 border border-slate-200 text-slate-400 bg-white rounded-soft hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 text-xs font-bold bg-[#1c3b2f] text-white border border-[#1c3b2f] rounded-soft transition-all">
              1
            </button>
            <button
              disabled
              className="p-1.5 border border-slate-200 text-slate-400 bg-white rounded-soft hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
