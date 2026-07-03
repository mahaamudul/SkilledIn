import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCheck, Check, X, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

export default function TeacherRequests() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all teacher requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['teacher-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher-requests');
      return res.data;
    }
  });

  // Handle status approval / rejection mutations
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/teacher-requests/${id}`, { status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      const displayStatus = variables.status === 'accepted' ? 'Approved' : 'Rejected';
      toast.success(`Application status updated to: ${displayStatus}`);
      queryClient.invalidateQueries({ queryKey: ['teacher-requests'] });
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(`Update failed: ${msg}`);
    }
  });

  const handleAction = (id, status) => {
    updateStatus.mutate({ id, status });
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
        <h2 className="text-2xl font-bold text-brand-primary">Teacher Applications Console</h2>
        <p className="text-slate-500 text-xs">Review educator applications and update roles dynamically.</p>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md">
        {requests.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-700">No applications found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                There are currently no instructor application submissions pending evaluation.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-655 border-collapse">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-150">
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
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="block font-bold text-brand-primary text-sm">{item.name}</span>
                        <span className="text-xs text-slate-400 font-semibold">{item.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="block text-xs font-bold text-slate-700 uppercase">{item.experience}</span>
                        <span className="text-xs text-brand-teal font-bold">{item.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-slate-655 line-clamp-1">{item.title}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                          item.status === 'accepted'
                            ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                            : item.status === 'rejected'
                            ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                            : 'bg-yellow-50 text-yellow-700 border border-yellow-250 shadow-sm'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleAction(item._id, 'accepted')}
                            disabled={item.status !== 'pending' || updateStatus.isPending}
                            className="p-2 bg-green-50 hover:bg-green-150 text-green-700 rounded-soft border border-green-200 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:pointer-events-none"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction(item._id, 'rejected')}
                            disabled={item.status !== 'pending' || updateStatus.isPending}
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

            {/* Pagination Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Showing <strong className="text-brand-primary">1-{requests.length}</strong> of <strong className="text-brand-primary">{requests.length}</strong> applicants
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
