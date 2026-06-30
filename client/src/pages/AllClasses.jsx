import React from 'react';
import { BookOpen, Search, Users, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AllClasses() {
  const mockClasses = [
    {
      id: 1,
      title: "React Frontend Architecture & Design",
      teacher: "Sarah Jenkins",
      price: "$99.00",
      description: "Learn custom state management, performance scaling, and modern styling integrations with Tailwind CSS and Framer Motion.",
      enrollments: "1,248 students",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Introduction to Figma UI/UX Layouts",
      teacher: "David Chen",
      price: "$79.00",
      description: "Master modern wireframing, components, auto-layouts, and premium prototyping pipelines to build competitive UX profiles.",
      enrollments: "830 students",
      image: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Digital SEO Marketing & Brand Mastery",
      teacher: "Alex Ross",
      price: "$59.00",
      description: "Explore search console optimization, digital search campaign budgets, and high-conversion content writing structures.",
      enrollments: "410 students",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Data Science with Python & Pandas",
      teacher: "Dr. Amanda Vance",
      price: "$129.00",
      description: "Analyze large-scale datasets, construct visual charts, and train introductory machine learning pipelines from scratch.",
      enrollments: "1,850 students",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Advanced Financial Modeling Pro",
      teacher: "Robert Kyle",
      price: "$149.00",
      description: "Construct dynamic spreadsheet valuations, projections, and venture capital pitches for emerging technology setups.",
      enrollments: "310 students",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Creative Copywriting and Ad Copy",
      teacher: "Melina Watson",
      price: "$49.00",
      description: "Write compelling hook strategies, email newsletters, and direct-response headlines to capture high organic traffic.",
      enrollments: "670 students",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#f8fafc]">
      {/* Top Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-slate-150 pb-8">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
            Explore All Approved Classes
          </h1>
          <p className="text-slate-500 text-sm">
            Select courses tailored to your specific career path, led by verified expert tutors.
          </p>
        </div>
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search classes or instructors..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm text-sm"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Grid container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {mockClasses.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            className="bg-white border border-slate-150 rounded-soft overflow-hidden hover:shadow-2xl hover:scale-[1.02] hover:border-brand-teal/20 transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            {/* Visual Image representation using actual Unsplash images with text shielding overlays */}
            <div className="h-48 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Dark overlay for readable headers and text shield */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/35 mix-blend-multiply z-10" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-20 text-left">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold border border-white/20">
                    Course #{item.id}
                  </span>
                  <span className="px-3 py-1 bg-[#1c3b2f] text-white text-xs font-bold rounded-full border border-white/10 shadow-md">
                    {item.price}
                  </span>
                </div>
                
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-secondary text-brand-primary border border-white/10 backdrop-blur-sm">
                    <Users className="w-3 h-3" />
                    {item.enrollments}
                  </span>
                </div>
              </div>
            </div>

            {/* Details panel */}
            <div className="p-6 flex flex-col flex-grow text-left">
              <h3 className="text-xl font-bold text-brand-primary mb-2 line-clamp-2 leading-snug group-hover:text-brand-teal transition-colors duration-300">
                {item.title}
              </h3>
              
              {/* Teacher info */}
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-4">
                <User className="w-3.5 h-3.5 text-brand-teal" />
                Instructor: {item.teacher}
              </div>

              {/* Course description */}
              <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                {item.description}
              </p>

              {/* Action Button at bottom */}
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-400">
                  <BookOpen className="w-4 h-4 text-brand-teal" />
                  <span className="text-xs font-bold uppercase tracking-wide">Standard Access</span>
                </div>
                <Link
                  to={`/class/${item.id}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-soft hover:bg-brand-primary/95 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md transition-all duration-300"
                >
                  Enroll
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Sleek Pagination Footer UI */}
      <div className="mt-16 flex items-center justify-between border-t border-slate-200/80 pt-6">
        <span className="text-xs text-slate-500 font-semibold">
          Showing <strong className="text-brand-primary">1-6</strong> of <strong className="text-brand-primary">6</strong> classes
        </span>
        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="p-2 border border-slate-200 text-slate-400 bg-white rounded-soft hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3.5 py-1.5 text-xs font-bold bg-[#1c3b2f] text-white border border-[#1c3b2f] rounded-soft transition-all">
            1
          </button>
          <button
            disabled
            className="p-2 border border-slate-200 text-slate-400 bg-white rounded-soft hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
