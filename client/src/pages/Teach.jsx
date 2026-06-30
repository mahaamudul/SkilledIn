import React, { useState } from 'react';
import { Send, FileText, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Teach() {
  const [status, setStatus] = useState('Pending'); // States: 'Pending', 'Approved', 'Rejected'
  const [experience, setExperience] = useState('beginner');
  const [category, setCategory] = useState('web-dev');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Tutor application submitted for review!');
    setStatus('Pending');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 bg-[#f8fafc] text-left space-y-6">
      {/* Visual State Simulator for Reviewers */}
      <div className="bg-slate-100 border border-slate-200 p-4 rounded-soft flex justify-between items-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Preview Application States:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setStatus('Pending')}
            className={`px-3 py-1 text-xs font-bold rounded-soft border transition-all ${
              status === 'Pending' ? 'bg-yellow-500 border-yellow-600 text-white' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatus('Approved')}
            className={`px-3 py-1 text-xs font-bold rounded-soft border transition-all ${
              status === 'Approved' ? 'bg-green-600 border-green-700 text-white' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setStatus('Rejected')}
            className={`px-3 py-1 text-xs font-bold rounded-soft border transition-all ${
              status === 'Rejected' ? 'bg-red-650 border-red-700 text-white' : 'bg-white border-slate-200 text-slate-600'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft p-8 shadow-md relative overflow-hidden">
        {/* Top visual strip indicating status */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${
          status === 'Approved' ? 'bg-green-500' : status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-400'
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

        {/* 1. Approved Teacher State Banner */}
        {status === 'Approved' ? (
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
        ) : (
          /* Form display if not approved */
          <div className="space-y-6">
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">
              Apply to become a teacher today. Provide your professional credentials, outline your categories of interest, and start uploading assignments and classes once approved.
            </p>

            {/* Application status alert if rejected */}
            {status === 'Rejected' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4.5 bg-red-50/50 border border-red-200 text-red-700 rounded-soft text-xs font-semibold flex gap-2.5 items-start"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Application Declined</span>
                  <p className="text-red-600 mt-1 leading-relaxed">
                    Our admin panel rejected the previous application due to insufficient curriculum details. Feel free to adjust values and re-apply below.
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
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-soft text-slate-500 text-sm focus:outline-none cursor-not-allowed"
                  disabled
                  value="Sophia Martinez (Simulated)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-soft text-slate-500 text-sm focus:outline-none cursor-not-allowed"
                  disabled
                  value="sophia.m@skilledin.com"
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
                className={`w-full py-2.5 text-white font-semibold rounded-soft transition-all flex items-center justify-center gap-2 mt-6 shadow-sm hover:scale-[1.01] active:scale-[0.99] ${
                  status === 'Rejected'
                    ? 'bg-red-650 hover:bg-red-700'
                    : 'bg-brand-primary hover:bg-brand-primary/95'
                }`}
              >
                {status === 'Rejected' ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-brand-secondary animate-spin" style={{ animationDuration: '4s' }} />
                    Re-Apply State Layout
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
