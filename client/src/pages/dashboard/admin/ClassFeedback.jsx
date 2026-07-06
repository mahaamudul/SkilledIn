import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, MessageSquare, Inbox, User } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function ClassFeedback() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch feedbacks for this specific class
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['class-feedbacks', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedbacks/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-teal" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div>
        <Link to="/dashboard/admin/all-classes" className="text-xs font-semibold text-brand-teal hover:underline">
          &larr; Back to Class Audits
        </Link>
        <h2 className="text-2xl font-bold text-brand-primary mt-1">Syllabus Evaluation Progress</h2>
        <p className="text-slate-500 text-xs mt-0.5">Check student reviews and rating metrics for this curriculum.</p>
      </div>

      <div className="bg-white border border-slate-150 rounded-soft p-6 shadow-md space-y-6">
        <h3 className="font-bold text-brand-primary flex items-center gap-2 border-b border-slate-100 pb-3">
          <MessageSquare className="w-5 h-5 text-brand-teal" />
          Teaching Evaluation Reports ({feedbacks.length})
        </h3>

        {feedbacks.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-700">No evaluations received</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Students enrolled in this curriculum have not submitted rating logs or reviews yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 divide-y divide-slate-100">
            {feedbacks.map((f, index) => (
              <div key={f._id || index} className={`pt-4 ${index === 0 ? 'pt-0' : ''} space-y-3`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {f.student_image ? (
                      <img
                        src={f.student_image}
                        alt={f.student_name}
                        className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-brand-primary">{f.student_name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Reviewer</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star
                        key={num}
                        className={`w-4 h-4 ${num <= f.rating ? 'fill-brand-secondary text-brand-secondary' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-slate-655 text-xs leading-relaxed bg-slate-50 p-3 rounded-soft border border-slate-100 italic">
                  "{f.description}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
