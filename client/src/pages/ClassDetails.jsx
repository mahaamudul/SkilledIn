import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ShieldCheck, User, Landmark, BookOpen, Clock, Tag, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

export default function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const classCatalog = {
    "1": {
      title: "React Frontend Architecture & Design",
      teacher: "Sarah Jenkins",
      teacherEmail: "sarah.j@skilledin.com",
      price: "$99.00",
      category: "Software Engineering",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      longDescription: "Deploy state-of-the-art web architectures. This course covers structured React rendering, hooks optimizations, custom middleware systems, dynamic client routers, and premium responsive design layout patterns. Taught by a seasoned software architect with over 10 years of experience building modern SaaS dashboards.",
      highlights: ["Dynamic state trees & Redux / Context patterns", "Rolldown & Vite compiler optimization details", "Advanced Framer Motion physics-based transitions", "Tailwind clean CSS setups & responsive rules"]
    },
    "2": {
      title: "Introduction to Figma UI/UX Layouts",
      teacher: "David Chen",
      teacherEmail: "david.c@skilledin.com",
      price: "$79.00",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=800&q=80",
      longDescription: "Go from wireframe to interactive prototype. This syllabus explores Figma advanced tools (auto-layout v5, nested properties, local variables, variants), typographic hierarchies, design systems creation, visual contrast ratios, and client feedback collaboration workflows.",
      highlights: ["Advanced auto-layouts & nested constraints", "Design tokens mapping & visual variables", "Micro-interaction triggers & screen transitions", "A/B testing guidelines & client audits"]
    },
    "3": {
      title: "Digital SEO Marketing & Brand Mastery",
      teacher: "Alex Ross",
      teacherEmail: "alex.r@skilledin.com",
      price: "$59.00",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      longDescription: "Drive organic search traffic and master search engine algorithms. Learn keyword indexing parameters, structured schema layouts, Google Analytics 4 dashboards, ad copies creation, and page speed index optimizations.",
      highlights: ["Organic keyword ranking & search console audits", "Google Analytics 4 event logs tracking", "Dynamic search campaign budget models", "A/B copy frameworks & landing page hooks"]
    },
    "4": {
      title: "Data Science with Python & Pandas",
      teacher: "Dr. Amanda Vance",
      teacherEmail: "amanda.v@skilledin.com",
      price: "$129.00",
      category: "Software Engineering",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      longDescription: "Master pandas dataframes, numpy arrays, and matplotlib visualizations. We construct robust mathematical data matrices, configure Jupyter environments, map database connections, and model linear regressions.",
      highlights: ["Pandas data frames cleanings & audits", "Matplotlib & Seaborn visual analytics charts", "Linear and logistic regression algorithms", "Jupyter notebook data structuring pipelines"]
    },
    "5": {
      title: "Advanced Financial Modeling Pro",
      teacher: "Robert Kyle",
      teacherEmail: "robert.k@skilledin.com",
      price: "$149.00",
      category: "Business Management",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
      longDescription: "Learn three-statement accounting configurations, discounted cash flow valuations, leverage buyout calculations, and debt structures projections. Build investor ready pitch structures.",
      highlights: ["Three-statement financial models integration", "Discounted cash flow (DCF) projections", "LBO valuation formulas & capital matrices", "Venture capital startup valuation decks"]
    },
    "6": {
      title: "Creative Copywriting and Ad Copy",
      teacher: "Melina Watson",
      teacherEmail: "melina.w@skilledin.com",
      price: "$49.00",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
      longDescription: "Transform draft sentences into highly optimized conversion engines. Study cognitive psychology sales anchors, email sequence triggers, editorial reviews, and digital ad text parameters.",
      highlights: ["Cognitive hooks & emotional copywriting formulas", "Email direct-response sequence building", "Ad campaign headline checks & analytics", "SEO-optimized blog post setups"]
    }
  };

  // Fetch class details from the server database
  const { data: dbClass, isLoading } = useQuery({
    queryKey: ['class-details', id],
    queryFn: async () => {
      // If the ID is a static mock number, bypass API request to let catalog fallbacks render instantly
      if (classCatalog[id]) return null;
      const res = await axios.get(`http://localhost:5000/classes/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // Mock checkout mutation to save payment record and increment enrollments
  const payMutation = useMutation({
    mutationFn: async (paymentData) => {
      const res = await axiosSecure.post('/payments', paymentData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Payment Successful! Transaction ID: ${data.transaction_id}`);
      navigate('/dashboard/my-enroll');
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(`Checkout failed: ${msg}`);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-teal" />
      </div>
    );
  }

  // Resolve current details (dynamic or static catalog fallback)
  let currentClass;
  if (classCatalog[id]) {
    currentClass = classCatalog[id];
  } else if (dbClass) {
    currentClass = {
      title: dbClass.title,
      teacher: dbClass.name,
      teacherEmail: dbClass.email,
      price: `$${dbClass.price.toFixed(2)}`,
      category: dbClass.category || "General Curriculum",
      image: dbClass.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      longDescription: dbClass.description,
      highlights: [
        "Syllabus verified by platform admin",
        "Individual grading checklist",
        "Lifetime access support",
        "Q&A directly with instructor"
      ]
    };
  } else {
    currentClass = classCatalog["1"];
  }

  const handlePay = () => {
    if (!user) {
      toast.error("Please sign in first to enroll in this class.");
      navigate('/login');
      return;
    }

    const numericPrice = parseFloat(currentClass.price.replace(/[^\d.]/g, ''));

    payMutation.mutate({
      class_id: id,
      class_title: currentClass.title,
      price: numericPrice,
      student_email: user.email,
      teacher_email: currentClass.teacherEmail,
      image: currentClass.image,
      teacher_name: currentClass.teacher
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#f8fafc] text-left">
      <div className="mb-6">
        <Link to="/all-classes" className="text-xs font-semibold text-brand-teal hover:underline">
          &larr; Back to All Classes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Immersive Header + Info Layout */}
        <div className="lg:col-span-8 bg-white border border-slate-150 rounded-soft shadow-md overflow-hidden">
          {/* Visual Image Header */}
          <div className="h-64 sm:h-80 relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentClass.image})` }}
            />
            {/* Dark overlay for accessibility shield */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 mix-blend-multiply" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-2">
              <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold border border-white/20 uppercase tracking-wide">
                {currentClass.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {currentClass.title}
              </h1>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-brand-primary">Curriculum Overview</h2>
              <p className="text-slate-655 text-sm leading-relaxed whitespace-pre-line">
                {currentClass.longDescription}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-sm font-bold uppercase text-brand-primary tracking-wider">Key Course Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentClass.highlights.map((hl, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-sm text-slate-650">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Instructor Pass & Pay checkout widget */}
        <div className="lg:col-span-4 space-y-6">
          {/* Checkout pricing card widget */}
          <div className="bg-white border border-slate-150 rounded-soft p-6 shadow-md text-left space-y-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-teal" />
            
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Standard Enrolment</span>
              <span className="px-2.5 py-0.5 bg-brand-teal/10 text-brand-teal text-[10px] font-bold rounded-full">
                Accredited Course
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-xs text-slate-400 font-semibold">Total Price</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-brand-primary">{currentClass.price}</span>
                <span className="text-xs text-slate-500 font-semibold">USD / One-time</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Lifetime Access</span>
                <span className="font-bold text-slate-700">Included</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Mentor Q&A</span>
                <span className="font-bold text-slate-700">Yes</span>
              </div>
              <div className="flex justify-between">
                <span>Assignment Grading</span>
                <span className="font-bold text-slate-700">Included</span>
              </div>
            </div>

            {/* Prominent Pay action button in primary theme */}
            <button
              onClick={handlePay}
              disabled={payMutation.isPending}
              className="w-full py-3 bg-[#1c3b2f] hover:bg-[#1c3b2f]/95 text-white font-bold rounded-soft hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:pointer-events-none"
            >
              {payMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-brand-secondary" />
                  Processing Checkout...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-brand-secondary" />
                  Pay and Enroll
                </>
              )}
            </button>
          </div>

          {/* Instructor profile pass */}
          <div className="bg-white border border-slate-150 rounded-soft p-6 shadow-md text-left space-y-4">
            <h3 className="font-bold text-brand-primary border-b border-slate-100 pb-2">Your Instructor</h3>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-50 text-brand-teal rounded-soft border border-slate-100">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-primary text-sm">{currentClass.teacher}</h4>
                <p className="text-xs text-slate-450 font-semibold mt-0.5">{currentClass.teacherEmail}</p>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Educators on SkilledIn are verified by administrators. They publish targeted projects and issue progress feedback reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
