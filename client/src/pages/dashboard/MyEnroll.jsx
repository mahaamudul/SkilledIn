import React from 'react';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyEnroll() {
  const enrolledClasses = [
    { id: 1, title: 'React Frontend Development', teacher: 'Sarah Jenkins', progress: '35%' },
    { id: 2, title: 'Introduction to UI/UX Design', teacher: 'David Chen', progress: '80%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-primary">My Enrolled Classes</h2>
        <p className="text-slate-500 text-sm">Track progress, complete assignments, and download invoices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolledClasses.map((item) => (
          <div key={item.id} className="bg-white border border-slate-100 rounded-soft p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-teal text-xs font-semibold mb-3">
                <BookOpen className="w-4 h-4" />
                Active Class
              </div>
              <h3 className="text-lg font-bold text-brand-primary mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-4">Instructor: {item.teacher}</p>
              
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                  <span>Progress</span>
                  <span>{item.progress}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-teal h-full" style={{ width: item.progress }} />
                </div>
              </div>
            </div>

            <Link
              to={`/dashboard/myenroll-class/${item.id}`}
              className="w-full py-2 bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary text-sm font-semibold rounded-soft transition-all flex items-center justify-center gap-1.5"
            >
              Continue Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
