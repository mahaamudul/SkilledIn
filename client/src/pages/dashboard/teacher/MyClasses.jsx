import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileEdit, Trash2, ArrowRight } from 'lucide-react';

export default function MyClasses() {
  const [classes, setClasses] = useState([
    { id: 1, title: 'React Frontend Architecture & Design', price: '$99.00', status: 'Accepted' },
    { id: 2, title: 'Introduction to Figma UI/UX Layouts', price: '$79.00', status: 'Pending' },
    { id: 3, title: 'Unpublished Business Incubator Track', price: '$149.00', status: 'Rejected' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary">My Uploaded Classes</h2>
          <p className="text-slate-500 text-xs">Manage courses and check approval states.</p>
        </div>
        <Link
          to="/dashboard/add-class"
          className="px-4 py-2 bg-brand-teal text-white font-semibold text-xs rounded-soft hover:bg-brand-teal/95 shadow-sm"
        >
          + Add New Class
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-slate-200 rounded-soft p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-brand-teal">{c.price}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  c.status === 'Accepted'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : c.status === 'Pending'
                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {c.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-brand-primary mb-6 line-clamp-2">
                {c.title}
              </h3>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Update Class modal details triggers here...')}
                  className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-soft border border-slate-200 flex items-center justify-center gap-1"
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-soft border border-red-200 flex items-center justify-center"
                  aria-label="Delete class"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <Link
                to={c.status === 'Accepted' ? `/dashboard/my-class/${c.id}` : '#'}
                onClick={(e) => { if (c.status !== 'Accepted') { e.preventDefault(); alert('This option is enabled only for Accepted classes.'); } }}
                className={`w-full py-2 flex items-center justify-center gap-1.5 text-xs font-bold rounded-soft border transition-all ${
                  c.status === 'Accepted'
                    ? 'bg-brand-primary text-white border-brand-primary hover:bg-brand-primary/95'
                    : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                }`}
              >
                See Progress
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
