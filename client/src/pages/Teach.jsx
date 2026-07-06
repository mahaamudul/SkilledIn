import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, FileText, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Teach() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [category, setCategory] = useState('web-dev');

  // Fetch active user request status
  const { data: request, isLoading } = useQuery({
    queryKey: ['teacher-request', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/teacher-requests/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Submit new application request
  const submitApplication = useMutation({
    mutationFn: async (appData) => {
      const res = await axiosSecure.post('/teacher-requests', appData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Teaching application submitted for review!');
      queryClient.invalidateQueries(['teacher-request', user?.email]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(`Submission failed: ${msg}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    submitApplication.mutate({
      name: user.displayName || 'Active Student',
      image: user.photoURL || '',
      email: user.email,
      experience,
      title: title || 'Educator Specialist',
      category
    });
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-100 text-brand-primary rounded-full flex items-center justify-center mx-auto border border-slate-200">
          <LogIn className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-brand-primary">Authentication Required</h2>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Please log in or register a client account first to access the instructor portal.
          </p>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-sm rounded-soft shadow transition-all"
        >
          Sign In Today
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-teal" />
      </div>
    );
  }

  const status = request?.status || 'none'; // 'pending', 'accepted', 'rejected', 'none'

  return (
    <div className="max-w-xl mx-auto px-4 py-16 bg-[#f8fafc] text-left space-y-6">
      <div className="bg-white border border-slate-150 rounded-soft p-8 shadow-md relative overflow-hidden">
        {/* Top visual status color band */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${
          status === 'accepted' ? 'bg-green-500' : status === 'rejected' ? 'bg-red-500' : status === 'pending' ? 'bg-yellow-400' : 'bg-slate-200'
        }`} />

        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-2.5 bg-brand-primary/5 text-brand-primary rounded-soft">
            <FileText className="w-6 h-6 text-brand-teal" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-primary">Teach on SkilledIn</h1>
            <p className="text-slate-500 text-xs font-semibold">Join our network of skilled educators.</p>
          </div>
        </div>

        {/* 1. Accepted Teacher Banner */}
        {status === 'accepted' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-6 text-center"
          >
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-100 shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-brand-primary">Application Approved</h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                Congratulations! You are registered as an official SkilledIn Educator. You may now create classes, post assignments, and submit evaluations.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-soft border border-slate-100 text-left space-y-2.5">
              <div className="flex gap-2 items-center text-xs font-bold text-slate-600">
                <Sparkles className="w-4 h-4 text-brand-secondary" />
                Your Teacher Checklist:
              </div>
              <ul className="text-xs text-slate-500 space-y-1.5 pl-6 list-disc">
                <li>Navigate to "Add Class" inside the Dashboard</li>
                <li>Write a course syllabus and tag categories</li>
                <li>Setup code assignments for enrolled graduates</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* 2. Pending Application Banner */}
        {status === 'pending' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-6 text-center"
          >
            <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto border border-yellow-100 shadow-inner animate-pulse">
              <AlertTriangle className="w-10 h-10 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-brand-primary">Application Pending</h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                Your credentials are currently undergoing assessment by our review panel. We will update your permission settings once verified.
              </p>
            </div>

            <div className="p-4.5 bg-slate-50 border border-slate-100 rounded-soft text-left">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Submitted Profile:</span>
              <div className="mt-2 text-xs text-slate-550 space-y-1">
                <div><span className="font-semibold text-slate-700">Category:</span> {request.category}</div>
                <div><span className="font-semibold text-slate-700">Experience:</span> {request.experience}</div>
                <div><span className="font-semibold text-slate-700">Proposed Title:</span> {request.title}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Form Input View (When status is rejected or none) */}
        {(status === 'none' || status === 'rejected') && (
          <div className="space-y-6">
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">
              Apply to become a teacher today. Provide your professional credentials, outline your categories of interest, and start uploading assignments and classes once approved.
            </p>

            {status === 'rejected' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4.5 bg-red-50/50 border border-red-200 text-red-700 rounded-soft text-xs font-semibold flex gap-2.5 items-start"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Application Declined</span>
                  <p className="text-red-600 mt-1 leading-relaxed">
                    Our admin panel rejected your previous application. Feel free to adjust credentials and re-submit.
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  disabled
                  value={user.displayName || 'Active Student'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-soft text-slate-500 text-sm focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  disabled
                  value={user.email || ''}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-soft text-slate-500 text-sm focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Teaching Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead JavaScript Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all shadow-sm"
                >
                  <option value="beginner">Beginner</option>
                  <option value="mid-level">Mid-level</option>
                  <option value="experienced">Experienced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Course Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all shadow-sm"
                >
                  <option value="web-dev">Web Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="data">Data Science</option>
                  <option value="business">Business Management</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitApplication.isPending}
                className={`w-full py-2.5 text-white font-semibold rounded-soft transition-all flex items-center justify-center gap-2 mt-6 shadow-sm hover:scale-[1.01] active:scale-[0.99] ${
                  status === 'rejected'
                    ? 'bg-red-650 hover:bg-red-700'
                    : 'bg-brand-primary hover:bg-brand-primary/95'
                }`}
              >
                {submitApplication.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : status === 'rejected' ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-brand-secondary" />
                    Re-Apply Teaching Request
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-brand-secondary" />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
