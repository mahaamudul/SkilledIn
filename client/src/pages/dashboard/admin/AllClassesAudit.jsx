import React, { useState } from 'react';
import { Eye, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AllClassesAudit() {
  const [classes, setClasses] = useState([
    { id: 1, title: "React Frontend Architecture & Design", teacherEmail: "sarah@example.com", price: "$99.00", status: "Pending" },
    { id: 2, title: "Introduction to Figma UI/UX Layouts", teacherEmail: "david@example.com", price: "$79.00", status: "Accepted" },
    { id: 3, title: "Advanced Financial Modeling Pro", teacherEmail: "robert@example.com", price: "$149.00", status: "Pending" },
  ]);

  const handleAction = (id, newStatus) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    alert(`Class curriculum ${newStatus === 'Accepted' ? 'Approved' : 'Rejected'}!`);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-primary">Classes Audit Console</h2>
        <p className="text-slate-500 text-xs">Review pending class uploads and check syllabus details.</p>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-650 border-collapse">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-455 border-b border-slate-150">
              <tr>
                <th className="px-6 py-4.5 text-left font-bold">Class Curriculum Details</th>
                <th className="px-6 py-4.5 text-left font-bold">Instructor Contacts</th>
                <th className="px-6 py-4.5 text-center font-bold">Audit Status</th>
                <th className="px-6 py-4.5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {classes.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="block font-bold text-brand-primary text-sm mb-1">{item.title}</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                      Price: {item.price}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500 font-semibold">{item.teacherEmail}</span>
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
                        className="p-2 bg-green-50 hover:bg-green-150 text-green-700 rounded-soft border border-green-200 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100"
                        title="Approve Class"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'Rejected')}
                        disabled={item.status !== 'Pending'}
                        className="p-2 bg-red-50 hover:bg-red-150 text-red-700 rounded-soft border border-red-200 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100"
                        title="Reject Class"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      {/* 'See Progress' button must be disabled by default if class is pending (not Accepted) */}
                      <button
                        onClick={() => alert(`Redirecting to progress details for class #${item.id}`)}
                        disabled={item.status !== 'Accepted'}
                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-soft border border-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100"
                        title="See Progress"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional Matching Pagination Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">
            Showing <strong className="text-brand-primary">1-3</strong> of <strong className="text-brand-primary">3</strong> audits
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
