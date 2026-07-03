import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BookOpen, FileEdit, Trash2, ArrowRight, Inbox } from 'lucide-react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function MyClasses() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch classes uploaded by the authenticated teacher
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['my-classes', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/classes?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-teal" />
      </div>
    );
  }

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

      {classes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-soft p-12 text-center shadow-sm space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
            <Inbox className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-700">No classes uploaded</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Get started by uploading your first course curriculum syllabus for verification.
            </p>
          </div>
          <Link
            to="/dashboard/add-class"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-soft shadow transition-all"
          >
            Create Curriculum
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classes.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-slate-200 rounded-soft p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-brand-teal">${c.price.toFixed(2)}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                    c.status === 'accepted'
                      ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                      : c.status === 'pending'
                      ? 'bg-yellow-50 text-yellow-700 border border-yellow-250 shadow-sm'
                      : 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
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
                    onClick={() => alert('Delete hook triggers here...')}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-soft border border-red-200 flex items-center justify-center"
                    aria-label="Delete class"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 'See Details' button is active when status is approved (accepted) */}
                <Link
                  to={c.status === 'accepted' ? `/dashboard/my-class/${c._id}` : '#'}
                  className={`w-full py-2 flex items-center justify-center gap-1.5 text-xs font-bold rounded-soft border transition-all ${
                    c.status === 'accepted'
                      ? 'bg-brand-primary text-white border-brand-primary hover:bg-brand-primary/95 shadow-sm'
                      : 'bg-slate-50 text-slate-400 border-slate-200 opacity-50 pointer-events-none'
                  }`}
                >
                  See Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
