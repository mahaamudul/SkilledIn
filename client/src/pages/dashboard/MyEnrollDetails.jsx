import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, FileText, CheckCircle2, Star, Calendar, MessageSquare, Clipboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyEnrollDetails() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [submissions, setSubmissions] = useState({});

  const assignments = [
    { id: 101, title: "Build Personal Portfolio", description: "Design a fully responsive grid system using Tailwind CSS and display your resume assets.", deadline: "2026-07-10" },
    { id: 102, title: "Vite Project Setup & Routing", description: "Configure a clean React environment with centralized routing mappings and layouts.", deadline: "2026-07-20" },
  ];

  const handleSub = (assignmentId) => {
    setSubmissions((prev) => ({ ...prev, [assignmentId]: true }));
    alert("Assignment submitted successfully!");
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`TER Submitted: ${rating} Stars - "${feedback}"`);
    setShowModal(false);
    setFeedback('');
  };

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link to="/dashboard/my-enroll" className="text-xs font-semibold text-brand-teal hover:underline">&larr; Back to Enrolled Classes</Link>
          <h2 className="text-2xl font-bold text-brand-primary mt-1">Class Progress Console: Course #{id}</h2>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4.5 py-2.5 bg-brand-teal text-white text-sm font-semibold rounded-soft hover:bg-brand-teal/95 shadow-md transition-all flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-brand-secondary" />
          Teaching Evaluation (TER)
        </button>
      </div>

      {/* Assignments Table Section */}
      <div className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-150 flex items-center gap-2">
          <Clipboard className="w-5 h-5 text-brand-teal" />
          <h3 className="font-bold text-brand-primary">Class Assignments Checklist</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-650 border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-450 border-b border-slate-150">
              <tr>
                <th className="px-6 py-4.5 text-left font-bold">Assignment Details</th>
                <th className="px-6 py-4.5 text-left font-bold">Deadline</th>
                <th className="px-6 py-4.5 text-center font-bold">Status</th>
                <th className="px-6 py-4.5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {assignments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 max-w-sm">
                    <span className="block font-bold text-brand-primary text-sm mb-1">{item.title}</span>
                    <span className="text-xs text-slate-500 line-clamp-2">{item.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-brand-teal" />
                      {item.deadline}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {submissions[item.id] ? (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm">
                        Submitted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-250 shadow-sm animate-pulse">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleSub(item.id)}
                      disabled={submissions[item.id]}
                      className="px-4 py-1.5 text-xs font-bold rounded-soft bg-brand-primary text-white hover:bg-brand-primary/95 disabled:bg-slate-100 disabled:text-slate-400 hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 transition-all shadow-sm"
                    >
                      Submit Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TER Modal Dialog */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-primary/45 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-150 rounded-soft shadow-2xl p-8 max-w-md w-full text-left space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-brand-primary">Teaching Evaluation Report</h3>
                <p className="text-xs text-slate-400 mt-1">Submit feedback to improve class quality.</p>
              </div>
              
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="p-1 hover:scale-110 transition-all text-brand-secondary"
                      >
                        <Star className={`w-8 h-8 ${num <= rating ? 'fill-brand-secondary text-brand-secondary' : 'text-slate-350'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Detailed Review</label>
                  <textarea
                    required
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your learning experience..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all shadow-inner"
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
                    className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-soft hover:bg-brand-primary/95 shadow-sm"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
