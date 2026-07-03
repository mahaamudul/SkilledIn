import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, FileText, CheckSquare, PlusCircle, BarChart2, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

export default function ClassProgress() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [desc, setDesc] = useState('');

  // Fetch real-time class statistics (enrollment, assignments, submissions)
  const { data: stats = { totalEnrollment: 0, totalAssignments: 0, submissions: 0 }, isLoading } = useQuery({
    queryKey: ['class-stats', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/stats/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // Mutation to handle assignment creation
  const addAssignmentMutation = useMutation({
    mutationFn: async (assignmentData) => {
      const res = await axiosSecure.post('/assignments', assignmentData);
      return res.data;
    },
    onSuccess: () => {
      toast.success(`Assignment "${title}" created successfully!`);
      queryClient.invalidateQueries({ queryKey: ['class-stats', id] });
      setShowModal(false);
      setTitle('');
      setDeadline('');
      setDesc('');
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(`Failed to create assignment: ${msg}`);
    }
  });

  const handleCreate = (e) => {
    e.preventDefault();
    addAssignmentMutation.mutate({
      class_id: id,
      title,
      deadline,
      description: desc
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-teal" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link to="/dashboard/my-classes" className="text-xs font-semibold text-brand-teal hover:underline">&larr; Back to My Classes</Link>
          <h2 className="text-2xl font-bold text-brand-primary mt-1">Class Progress Dashboard</h2>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4.5 py-2.5 bg-brand-teal text-white text-sm font-semibold rounded-soft hover:bg-brand-teal/95 shadow-sm transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-brand-secondary" />
          Create Assignment
        </button>
      </div>

      {/* 3 Statistical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Enrollment */}
        <div className="bg-[#1c3b2f]/5 border border-[#1c3b2f]/10 p-6 rounded-soft shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Class Engagement</span>
            <Users className="w-5 h-5 text-brand-teal" />
          </div>
          <span className="block text-3xl font-extrabold text-brand-primary">{stats.totalEnrollment}</span>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Total Enrolled Students</span>
        </div>

        {/* Card 2: Created Assignments */}
        <div className="bg-[#1c3b2f]/5 border border-[#1c3b2f]/10 p-6 rounded-soft shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Course Work</span>
            <FileText className="w-5 h-5 text-brand-teal" />
          </div>
          <span className="block text-3xl font-extrabold text-brand-primary">{stats.totalAssignments}</span>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Total Created Assignments</span>
        </div>

        {/* Card 3: Per Day Submitted */}
        <div className="bg-[#1c3b2f]/5 border border-[#1c3b2f]/10 p-6 rounded-soft shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Total Progress</span>
            <CheckSquare className="w-5 h-5 text-brand-teal" />
          </div>
          <span className="block text-3xl font-extrabold text-brand-primary">{stats.submissions}</span>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Total Submissions Received</span>
        </div>
      </div>

      {/* Mock progress graph area */}
      <div className="bg-white border border-slate-200 p-6 rounded-soft shadow-sm space-y-4">
        <h3 className="font-bold text-brand-primary flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-brand-teal" />
          Submission Frequency Insights
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Monitor your student evaluation statistics. Below graphs map submission peaks to check daily activity parameters.
        </p>
        <div className="h-12 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-xs text-slate-400 font-bold">
          [Frequency Tracker Chart Simulator]
        </div>
      </div>

      {/* Assignment Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/45 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-150 rounded-soft shadow-xl p-8 max-w-md w-full text-left space-y-6">
            <div>
              <h3 className="text-xl font-bold text-brand-primary">Create New Assignment</h3>
              <p className="text-xs text-slate-400 mt-1">Assign coursework and due dates to this accepted curriculum.</p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Redesign Dashboard Sidebar Menu"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Due Deadline</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Work Instructions</label>
                <textarea
                  required
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Provide comprehensive layout guides and code expectations..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-soft hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addAssignmentMutation.isPending}
                  className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-soft hover:bg-brand-primary/95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {addAssignmentMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
