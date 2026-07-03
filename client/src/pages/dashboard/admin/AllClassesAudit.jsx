import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, Check, X, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AllClassesAudit() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch all classes for auditing
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['all-classes-audit'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes');
      return res.data;
    }
  });

  // Handle class status changes
  const updateClassStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/classes/${id}`, { status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      const displayStatus = variables.status === 'accepted' ? 'Approved' : 'Rejected';
      toast.success(`Class status updated to: ${displayStatus}`);
      queryClient.invalidateQueries({ queryKey: ['all-classes-audit'] });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(`Update failed: ${msg}`);
    }
  });

  const handleAction = (id, status) => {
    updateClassStatus.mutate({ id, status });
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-teal" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-primary">Classes Audit Console</h2>
        <p className="text-slate-500 text-xs">Review pending class uploads and check syllabus details.</p>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md">
        {classes.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-700">No classes submitted</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Instructors have not uploaded any class syllabi for audit reviews.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-655 border-collapse">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-150">
                  <tr>
                    <th className="px-6 py-4.5 text-left font-bold">Class Curriculum Details</th>
                    <th className="px-6 py-4.5 text-left font-bold">Instructor Contacts</th>
                    <th className="px-6 py-4.5 text-center font-bold">Audit Status</th>
                    <th className="px-6 py-4.5 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {classes.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="block font-bold text-brand-primary text-sm mb-1">{item.title}</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                          Price: ${item.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500 font-semibold">{item.email}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                          item.status === 'accepted'
                            ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                            : item.status === 'rejected'
                            ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                            : 'bg-yellow-50 text-yellow-700 border border-yellow-250 shadow-sm animate-pulse'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleAction(item._id, 'accepted')}
                            disabled={item.status !== 'pending' || updateClassStatus.isPending}
                            className="p-2 bg-green-50 hover:bg-green-150 text-green-700 rounded-soft border border-green-200 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100"
                            title="Approve Class"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction(item._id, 'rejected')}
                            disabled={item.status !== 'pending' || updateClassStatus.isPending}
                            className="p-2 bg-red-50 hover:bg-red-150 text-red-700 rounded-soft border border-red-200 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100"
                            title="Reject Class"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          {/* 'See Progress' is disabled by default if class is pending (not accepted) */}
                          <button
                            onClick={() => navigate(`/dashboard/class/${item._id}`)}
                            disabled={item.status !== 'accepted'}
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

            {/* Pagination Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Showing <strong className="text-brand-primary">1-{classes.length}</strong> of <strong className="text-brand-primary">{classes.length}</strong> audits
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
          </>
        )}
      </div>
    </div>
  );
}
