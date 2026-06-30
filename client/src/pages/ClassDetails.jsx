import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, User, Landmark } from 'lucide-react';

export default function ClassDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-slate-100 rounded-soft p-8 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
          Class Details: Course ID #{id}
        </h1>
        <p className="text-slate-600 mb-8">
          This is a placeholder for the class details page. Here, students can read details of the teacher and the curriculum, check prices, and proceed with a secure checkout.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-50 p-6 rounded-soft border border-slate-100">
            <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-brand-teal" />
              Teacher Information
            </h3>
            <p className="text-sm text-slate-600">
              Name: Expert Tutor<br />
              Email: tutor@skilledin.com
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-soft border border-slate-100">
            <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-brand-teal" />
              Pricing & Enrolment
            </h3>
            <p className="text-sm text-slate-600">
              Price: <strong className="text-brand-primary text-base">$99.00</strong><br />
              Includes lifetime access and support.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <Link
            to="/all-classes"
            className="text-sm text-slate-500 hover:text-brand-primary font-medium"
          >
            &larr; Back to Classes
          </Link>
          <button
            onClick={() => alert('Proceeding to checkout payment integration...')}
            className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-soft hover:bg-brand-primary/95 transition-all flex items-center gap-2 shadow-sm"
          >
            <ShieldCheck className="w-5 h-5 text-brand-secondary" />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
