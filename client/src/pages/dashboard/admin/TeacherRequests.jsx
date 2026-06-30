import React, { useState } from 'react';
import { UserCheck, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TeacherRequests() {
  const [requests, setRequests] = useState([
    { id: 1, name: "Marcus Thompson", email: "marcus@tutors.com", experience: "Experienced", category: "Web Development", title: "React Architecture", status: "Pending" },
    { id: 2, name: "Jessica Alba", email: "jessica@tutors.com", experience: "Mid-level", category: "UI/UX Design", title: "Figma Typography", status: "Pending" },
    { id: 3, name: "Dr. Alan Grant", email: "alan@paleo.edu", experience: "Experienced", category: "Data Science", title: "Dinosaur Data Analysis", status: "Accepted" },
    { id: 4, name: "Claire Dearing", email: "claire@park.org", experience: "Mid-level", category: "Business Management", title: "Operational Safety", status: "Rejected" },
  ]);

  const handleAction = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    alert(`Application ${newStatus === 'Accepted' ? 'Approved' : 'Rejected'}!`);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-primary">Teacher Applications Console</h2>
        <p className="text-slate-500 text-xs">Review educator applications and update roles dynamically.</p>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-650 border-collapse">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-455 border-b border-slate-150">
              <tr>
                <th className="px-6 py-4.5 text-left font-bold">Applicant Details</th>
                <th className="px-6 py-4.5 text-left font-bold">Experience & Category</th>
                <th className="px-6 py-4.5 text-left font-bold">Proposed Course Title</th>
                <th className="px-6 py-4.5 text-center font-bold">Status</th>
                <th className="px-6 py-4.5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {requests.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="block font-bold text-brand-primary text-sm">{item.name}</span>
                    <span className="text-xs text-slate-400 font-semibold">{item.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="block text-xs font-bold text-slate-700">{item.experience}</span>
                    <span className="text-xs text-brand-teal font-semibold">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-slate-650 line-clamp-1">{item.title}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      item.status === 'Accepted'
                        ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                        : item.status === 'Rejected'
                        ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-250 shadow-sm animate-pulse'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAction(item.id, 'Accepted')}
                        disabled={item.status !== 'Pending'}
                        className="p-2 bg-green-50 hover:bg-green-150 text-green-700 rounded-soft border border-green-200 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:pointer-events-none"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'Rejected')}
                        disabled={item.status !== 'Pending'}
                        className="p-2 bg-red-50 hover:bg-red-150 text-red-700 rounded-soft border border-red-200 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:pointer-events-none"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sleek, responsive Pagination Footer UI layout component */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">
            Showing <strong className="text-brand-primary">1-4</strong> of <strong className="text-brand-primary">4</strong> applicants
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
