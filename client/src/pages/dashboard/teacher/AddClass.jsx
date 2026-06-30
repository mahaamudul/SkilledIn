import React from 'react';
import { Send, FileText } from 'lucide-react';

export default function AddClass() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Class saved as Pending and sent to admin for approval!');
  };

  return (
    <div className="max-w-xl mx-auto text-left">
      <div className="bg-white border border-slate-200/80 rounded-soft p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-soft">
            <FileText className="w-6 h-6 text-brand-teal" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-primary">Create New Class Curriculum</h2>
            <p className="text-slate-500 text-xs">Complete details below. Saved as pending by default.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Class Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Advanced React Design Systems"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Class Price ($ USD)
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="e.g. 99"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Banner Image URL
              </label>
              <input
                type="text"
                required
                placeholder="e.g. https://images.com/banner.png"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Instructor Name
            </label>
            <input
              type="text"
              disabled
              value="Expert Teacher (Auto-filled)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-soft text-sm text-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Instructor Email
            </label>
            <input
              type="email"
              disabled
              value="teacher@skilledin.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-soft text-sm text-slate-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Course Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Outline course materials, required tool stacks, and lesson topics..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-brand-primary text-white font-semibold rounded-soft hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
          >
            <Send className="w-4 h-4" />
            Submit Class for Admin Audit
          </button>
        </form>
      </div>
    </div>
  );
}
