import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, ArrowRight, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function MyEnroll() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch student enrolled classes
  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ['enrolled-classes', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/student-enrolled-classes/${user.email}`);
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

  const defaultBanner = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-primary">My Enrolled Classes</h2>
        <p className="text-slate-500 text-sm">Track progress, complete assignments, and continue learning.</p>
      </div>

      {enrolledClasses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-soft p-12 text-center shadow-sm space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
            <Inbox className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-700">No classes enrolled yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Browse our accredited classes catalog to select courses and begin your professional training.
            </p>
          </div>
          <Link
            to="/all-classes"
            className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-soft shadow transition-all"
          >
            Explore Classes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledClasses.map((item) => (
            <div key={item._id} className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-200">
              <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${item.image || defaultBanner})` }}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-bold uppercase tracking-wider w-max">
                    <BookOpen className="w-3 h-3 text-brand-secondary" />
                    Enrolled
                  </div>
                  <h3 className="text-base font-bold line-clamp-1">{item.class_title}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="text-xs text-slate-550">
                  <p className="font-semibold"><span className="text-slate-400">Instructor:</span> {item.teacher_name}</p>
                  <p className="mt-1 text-[10px] text-slate-400 font-mono uppercase tracking-wide">TXN ID: {item.transaction_id}</p>
                </div>

                <Link
                  to={`/dashboard/myenroll-class/${item.class_id}`}
                  className="w-full py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-soft transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Continue Learning
                  <ArrowRight className="w-3.5 h-3.5 text-brand-secondary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
