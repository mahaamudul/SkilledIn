import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Code,
  Palette,
  Briefcase
} from 'lucide-react';

export default function Home() {
  const slides = [
    {
      title: "Unlock Your Potential with Expert Guidance",
      description: "Join a vibrant community of lifelong learners. Explore courses in technology, business, design, and more taught by qualified industry mentors.",
      badge: "Empowering Learning",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      accent: "Web Development"
    },
    {
      title: "Streamlined Class Management for Modern Tutors",
      description: "Equip your teaching business with powerful assignment tracking, real-time feedback tools, and automated statistics consoles.",
      badge: "Advanced Tools",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      accent: "UI/UX Design"
    },
    {
      title: "Achieve Accredited Career Certifications",
      description: "Accelerate your professional trajectory with structured, interactive curriculums designed to meet active industry demands.",
      badge: "Industry Accreditations",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      accent: "Digital Marketing"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const partnerLogos = [
    {
      name: "EduSphere",
      description: "Providing global curriculum standards and institutional certifications.",
      icon: GraduationCap
    },
    {
      name: "TechGuild",
      description: "Facilitating internship placements and direct junior developer hires.",
      icon: Code
    },
    {
      name: "DesignHub",
      description: "Sponsoring creative challenges, portfolios reviews, and design critiques.",
      icon: Palette
    },
    {
      name: "BizStart",
      description: "Validating business administration tracks and incubation projects.",
      icon: Briefcase
    }
  ];

  const feedbacks = [
    {
      id: 1,
      studentName: "Liam Henderson",
      className: "React Frontend Architecture",
      message: "The step-by-step assignment tracking in this class completely changed my workflow. The mentor reviews were incredibly detailed and helpful.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      studentName: "Sophia Martinez",
      className: "Introduction to UI/UX Design",
      message: "I loved the focus on design critiques and practical Figma layouts. The feedback cycles allowed me to build a highly competitive portfolio.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      studentName: "Ethan Vance",
      className: "Digital Marketing Masterclass",
      message: "Excellent coverage of SEO metrics and digital ad frameworks. The analytics tools discussed are directly applicable to my client work.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 4,
      studentName: "Chloe Jenkins",
      className: "Business Strategy Incubator",
      message: "An outstanding curriculum that covers financial modeling and presentation decks. The feedback from other peers was invaluable.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const [feedbackIndex, setFeedbackIndex] = useState(0);

  const handleFeedbackPrev = () => {
    setFeedbackIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const handleFeedbackNext = () => {
    setFeedbackIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="space-y-24 pb-24 overflow-x-hidden bg-[#f8fafc]">
      {/* 1. Hero Banner / Carousel Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-brand-teal/5 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side text details */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-secondary animate-pulse" />
                {slides[currentSlide].badge}
              </div>

              <div className="h-[200px] sm:h-[160px] md:h-[140px] lg:h-[220px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-primary leading-tight">
                      {slides[currentSlide].title.split(" ").map((w, idx) => (
                        <span key={idx}>
                          {w === "Expert" || w === "Class" || w === "Career" ? (
                            <span className="text-brand-teal">{w} </span>
                          ) : w === "Guidance" || w === "Tutors" || w === "Certifications" ? (
                            <span className="text-brand-secondary">{w} </span>
                          ) : (
                            w + " "
                          )}
                        </span>
                      ))}
                    </h1>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="h-[80px] sm:h-[60px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 text-slate-600 text-base md:text-lg max-w-xl leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6">
                <Link
                  to="/all-classes"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-primary text-white font-semibold rounded-soft hover:bg-brand-primary/95 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-md"
                >
                  Explore Classes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/teach"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-primary border border-slate-200 font-semibold rounded-soft hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] transition-all duration-300 shadow-sm"
                >
                  Become a Teacher
                </Link>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3 pt-6">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 hover:text-brand-primary hover:border-slate-300 transition-all shadow-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx ? 'w-6 bg-brand-teal' : 'w-2.5 bg-slate-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 hover:text-brand-primary hover:border-slate-300 transition-all shadow-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Right side Carousel illustration with premium Unsplash images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[420px] lg:max-w-none aspect-square bg-gradient-to-tr from-brand-primary/10 to-brand-teal/10 p-2 rounded-3xl shadow-2xl overflow-hidden group">
                <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                    />
                  </AnimatePresence>
                  
                  {/* Subtle dark overlay with mix blend multiply */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 mix-blend-multiply z-10" />

                  <div className="w-full h-full flex flex-col justify-between p-8 text-white relative z-20">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-widest text-brand-secondary font-bold bg-black/35 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                        Interactive Platform
                      </span>
                      <GraduationCap className="w-10 h-10 text-brand-secondary stroke-[1.5]" />
                    </div>

                    <div className="space-y-4 text-left">
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold inline-block border border-white/20">
                        Active Track: {slides[currentSlide].accent}
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight leading-snug">
                        Collaborative learning models configured for modern classrooms.
                      </h3>
                      <div className="flex gap-2.5 items-center">
                        <div className="w-8 h-8 rounded-full bg-brand-secondary/20 flex items-center justify-center text-xs font-bold text-brand-secondary border border-brand-secondary/30">
                          IN
                        </div>
                        <span className="text-sm font-medium text-slate-200">Live with Mentor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Partners and Collaborators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-brand-primary">Our Strategic Collaborations</h2>
            <p className="text-slate-500">
              We partner with industry-leading academic institutions and technology companies to co-create relevant course guidelines and direct pathways to career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerLogos.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={partner.name}
                  variants={fadeUp}
                  className="bg-white border border-slate-100 p-8 rounded-soft shadow-sm hover:shadow-xl hover:border-brand-teal/20 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal rounded-full transition-all duration-300 mb-5">
                    <Icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary mb-2 transition-colors duration-300 group-hover:text-brand-teal">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {partner.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. Platform Statistics Section */}
      <section className="bg-slate-50/50 py-20 border-y border-slate-150/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side modern cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-6 space-y-6"
            >
              <div className="text-left space-y-3">
                <span className="text-xs uppercase tracking-widest text-brand-teal font-bold">System Metrics</span>
                <h2 className="text-3xl font-bold tracking-tight text-brand-primary">Growth and Global Reach</h2>
                <p className="text-slate-500 max-w-xl">
                  SkilledIn keeps accelerating its platform expansion. Our records monitor active contributions from students and educational organizers globally.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {/* Card 1: Users */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-5 p-5 bg-[#1c3b2f]/5 border border-[#1c3b2f]/10 rounded-soft shadow-sm hover:shadow-md hover:scale-[1.01] transition-all text-left"
                >
                  <div className="p-3 bg-brand-primary text-white rounded-soft">
                    <Users className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <div>
                    <span className="block text-2xl font-extrabold text-brand-primary">24,000+</span>
                    <span className="text-sm font-semibold text-slate-600">Total Registered Users</span>
                  </div>
                </motion.div>

                {/* Card 2: Classes */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-5 p-5 bg-[#1c3b2f]/5 border border-[#1c3b2f]/10 rounded-soft shadow-sm hover:shadow-md hover:scale-[1.01] transition-all text-left"
                >
                  <div className="p-3 bg-brand-primary text-white rounded-soft">
                    <BookOpen className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <div>
                    <span className="block text-2xl font-extrabold text-brand-primary">1,200+</span>
                    <span className="text-sm font-semibold text-slate-600">Approved Classes & Courses</span>
                  </div>
                </motion.div>

                {/* Card 3: Enrollments */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-5 p-5 bg-[#1c3b2f]/5 border border-[#1c3b2f]/10 rounded-soft shadow-sm hover:shadow-md hover:scale-[1.01] transition-all text-left"
                >
                  <div className="p-3 bg-brand-primary text-white rounded-soft">
                    <Award className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <div>
                    <span className="block text-2xl font-extrabold text-brand-primary">85,000+</span>
                    <span className="text-sm font-semibold text-slate-600">Total Enrollment Invoices</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side Dashboard Simulation Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="bg-white border border-slate-200/80 p-6 rounded-soft shadow-xl relative text-left">
                {/* Window header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">dashboard_metrics_console</span>
                </div>

                {/* Dashboard layout simulator */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-soft border border-slate-100">
                    <div>
                      <span className="text-xs font-semibold uppercase text-slate-400">Class Progress</span>
                      <h4 className="text-base font-bold text-brand-primary">React & Tailwind Architecture</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-brand-teal/10 text-brand-teal text-xs font-bold rounded-full">
                      Accepted
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-soft border border-slate-100 text-center shadow-sm">
                      <span className="text-xs text-slate-400">Active Students</span>
                      <span className="block text-xl font-bold text-brand-primary mt-1">482</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-soft border border-slate-100 text-center shadow-sm">
                      <span className="text-xs text-slate-400">Completion rate</span>
                      <span className="block text-xl font-bold text-brand-primary mt-1">94.2%</span>
                    </div>
                  </div>

                  {/* Simulated Chart Graph bar */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs text-slate-400 font-semibold">Weekly Submitted Assignments</span>
                    <div className="h-28 flex items-end gap-2.5 bg-slate-50 p-4 rounded-soft border border-slate-100 justify-between">
                      <div className="w-full bg-brand-primary/20 h-[30%] rounded-t-sm" />
                      <div className="w-full bg-brand-primary/20 h-[50%] rounded-t-sm" />
                      <div className="w-full bg-brand-primary/20 h-[40%] rounded-t-sm" />
                      <div className="w-full bg-brand-teal h-[85%] rounded-t-sm relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                          85%
                        </div>
                      </div>
                      <div className="w-full bg-brand-primary/20 h-[60%] rounded-t-sm" />
                      <div className="w-full bg-brand-primary/20 h-[70%] rounded-t-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Feedback Carousel Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold">Testimonials</span>
            <h2 className="text-3xl font-bold tracking-tight text-brand-primary">What Our Students Say</h2>
            <p className="text-slate-500">
              Read reviews from certified graduates who successfully transitioned to full-time engineering and product design roles.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const item = feedbacks[(feedbackIndex + offset) % feedbacks.length];
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-slate-150 rounded-soft p-8 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-brand-teal/10 hover:scale-[1.01] transition-all duration-300 text-left h-[280px]"
                  >
                    <div className="space-y-3">
                      <span className="block font-bold text-brand-primary text-base">
                        {item.className}
                      </span>
                      <p className="text-sm text-slate-650 italic leading-relaxed line-clamp-5">
                        "{item.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 mt-auto">
                      <img
                        src={item.avatar}
                        alt={item.studentName}
                        className="w-10 h-10 rounded-full object-cover border border-brand-teal/20 shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-brand-primary text-sm leading-none">{item.studentName}</h4>
                        <span className="text-xs text-brand-teal font-semibold mt-1 block">Verified Student</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleFeedbackPrev}
                className="p-2.5 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 hover:text-brand-primary hover:border-slate-350 transition-all shadow-sm"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5">
                {feedbacks.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFeedbackIndex(idx % feedbacks.length)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (feedbackIndex % feedbacks.length) === idx ? 'w-5 bg-brand-teal' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleFeedbackNext}
                className="p-2.5 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 hover:text-brand-primary hover:border-slate-350 transition-all shadow-sm"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Teacher Call-To-Action (CTA) Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary rounded-2xl overflow-hidden shadow-2xl text-white relative">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side Graphic representation with Unsplash Tutor photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 p-8 lg:p-12 lg:pr-0"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-soft space-y-6 text-left shadow-lg relative overflow-hidden h-[300px] flex flex-col justify-between">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80)' }}
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary font-bold text-sm border border-white/20">
                    MT
                  </div>
                  <div>
                    <h4 className="font-bold">Mentor Invitation Console</h4>
                    <span className="text-xs text-slate-300">Teach today, impact tomorrow</span>
                  </div>
                </div>
                
                <div className="space-y-3 relative z-10">
                  <div className="flex gap-2 items-center text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                    Custom Class Upload Controls
                  </div>
                  <div className="flex gap-2 items-center text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                    Comprehensive Assignment Builders
                  </div>
                  <div className="flex gap-2 items-center text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                    Review and Grade submissions
                  </div>
                </div>

                <div className="pt-2 border-t border-white/15 relative z-10">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span>Approved teachers</span>
                    <span className="font-bold text-white">Joined: 150+ Tutors</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side copy and CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 p-8 lg:p-12 text-left space-y-6"
            >
              <span className="text-xs uppercase tracking-widest text-brand-secondary font-bold">Share Your Expertise</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug">
                Join SkilledIn as a Professional Educator
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                Empower students by creating courses, publishing hands-on assignments, and tracking evaluation reports. Submit your tutor application today and transition to a certified instructor profile.
              </p>
              
              <div className="pt-4">
                <Link
                  to="/teach"
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#e2b74a] text-brand-primary font-bold rounded-soft hover:bg-[#e2b74a]/95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Start teaching today
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Custom Section 1: "Why Learn With Us" Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold">Why SkilledIn?</span>
            <h2 className="text-3xl font-bold tracking-tight text-brand-primary">Designed for Interactive Education</h2>
            <p className="text-slate-500">
              Unlike static reading tutorials, SkilledIn provides functional student dashboards, homework submission trackers, and direct mentor feedback reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-slate-100 p-8 rounded-soft shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-brand-teal/10 transition-all duration-300 text-left space-y-4"
            >
              <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-soft w-fit">
                <Award className="w-6 h-6 text-brand-teal" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary">Verified Elite Instructors</h3>
              <p className="text-slate-650 text-sm leading-relaxed">
                Tutors undergo thorough review processes by our admin panel before being approved to host any class curriculum.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-slate-100 p-8 rounded-soft shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-brand-teal/10 transition-all duration-300 text-left space-y-4"
            >
              <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-soft w-fit">
                <BookOpen className="w-6 h-6 text-brand-teal" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary">Interactive Practice Sessions</h3>
              <p className="text-slate-650 text-sm leading-relaxed">
                Work on direct class assignments designed by instructors, submit them through your dashboard, and increment your evaluation stats.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-slate-100 p-8 rounded-soft shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-brand-teal/10 transition-all duration-300 text-left space-y-4"
            >
              <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-soft w-fit">
                <ShieldCheck className="w-6 h-6 text-brand-teal" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary">Secure Enrollment Invoices</h3>
              <p className="text-slate-650 text-sm leading-relaxed">
                Seamless checkout processes logs transaction data and provides direct download of invoices for verified course security.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 5. Custom Section 2: "Trending Categories" Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold">Top Pathways</span>
            <h2 className="text-3xl font-bold tracking-tight text-brand-primary">Trending Learning Categories</h2>
            <p className="text-slate-500">
              Select one of our specialized educational disciplines and begin your targeted skill learning track.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cat 1 */}
            <motion.div
              variants={fadeUp}
              className="group bg-white border border-slate-100 p-6 rounded-soft hover:bg-brand-primary hover:text-white hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 bg-brand-teal/10 text-brand-teal group-hover:bg-white/10 group-hover:text-brand-secondary rounded-soft w-fit mb-6">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary group-hover:text-white mb-2">Software Engineering</h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-350">HTML, CSS, JS, React, Express, MongoDB</p>
              </div>
              <span className="block mt-6 text-sm font-semibold text-brand-teal group-hover:text-brand-secondary">
                420 Classes &rarr;
              </span>
            </motion.div>

            {/* Cat 2 */}
            <motion.div
              variants={fadeUp}
              className="group bg-white border border-slate-100 p-6 rounded-soft hover:bg-brand-primary hover:text-white hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 bg-brand-teal/10 text-brand-teal group-hover:bg-white/10 group-hover:text-brand-secondary rounded-soft w-fit mb-6">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary group-hover:text-white mb-2">UI/UX Design</h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-350">Figma, Prototyping, Wireframing, Styling</p>
              </div>
              <span className="block mt-6 text-sm font-semibold text-brand-teal group-hover:text-brand-secondary">
                280 Classes &rarr;
              </span>
            </motion.div>

            {/* Cat 3 */}
            <motion.div
              variants={fadeUp}
              className="group bg-white border border-slate-100 p-6 rounded-soft hover:bg-brand-primary hover:text-white hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 bg-brand-teal/10 text-brand-teal group-hover:bg-white/10 group-hover:text-brand-secondary rounded-soft w-fit mb-6">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary group-hover:text-white mb-2">Digital Marketing</h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-350">SEO, Campaigns, Ads, Copywriting, Metrics</p>
              </div>
              <span className="block mt-6 text-sm font-semibold text-brand-teal group-hover:text-brand-secondary">
                190 Classes &rarr;
              </span>
            </motion.div>

            {/* Cat 4 */}
            <motion.div
              variants={fadeUp}
              className="group bg-white border border-slate-100 p-6 rounded-soft hover:bg-brand-primary hover:text-white hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 bg-brand-teal/10 text-brand-teal group-hover:bg-white/10 group-hover:text-brand-secondary rounded-soft w-fit mb-6">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary group-hover:text-white mb-2">Business Management</h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-350">Finance, Incubations, Strategy, Accounting</p>
              </div>
              <span className="block mt-6 text-sm font-semibold text-brand-teal group-hover:text-brand-secondary">
                310 Classes &rarr;
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
