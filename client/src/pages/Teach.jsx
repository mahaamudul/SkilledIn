import React from 'react';
import { Send, FileText } from 'lucide-react';

export default function Teach() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white border border-slate-100 rounded-soft p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-soft">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-primary">Teach on SkilledIn</h1>
            <p className="text-slate-500 text-sm">Join our network of skilled educators.</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6">
          Apply to become a teacher today. Provide your professional credentials, outline your categories of interest, and start uploading assignments and classes once approved.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); alert('Teacher application submitted!'); }} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all text-sm"
              disabled
              value="John Doe (Placeholder)"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all text-sm"
              disabled
              value="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Experience Level
            </label>
            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all text-sm">
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-level</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Course Category
            </label>
            <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all text-sm">
              <option value="web-dev">Web Development</option>
              <option value="design">UI/UX Design</option>
              <option value="marketing">Digital Marketing</option>
              <option value="data">Data Science</option>
              <option value="business">Business Management</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-brand-primary text-white font-semibold rounded-soft hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
          >
            <Send className="w-4 h-4" />
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
