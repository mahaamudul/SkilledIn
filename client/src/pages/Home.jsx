import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  User,
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Code,
  Palette,
  Briefcase,
  Flag
} from 'lucide-react';

const SafeMarquee = typeof Marquee === 'function' ? Marquee : (Marquee.default || Marquee);

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

  const roadmapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start 64px", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const indicatorY = useTransform(
    scrollYProgress,
    [0, 0.125, 0.375, 0.625, 0.875, 1],
    ["0%", "12.5%", "37.5%", "62.5%", "87.5%", "100%"]
  );
  const indicatorX = useTransform(
    scrollYProgress, 
    [0, 0.125, 0.375, 0.625, 0.875, 1], 
    ["50%", "58%", "58%", "42%", "42%", "50%"]
  );

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

  const journeySteps = [
    {
      number: "01",
      studentTitle: "Explore & Enroll",
      studentDesc: "Students discover structured programs taught by verified industry mentors, select the best match, and complete a secure enrollment check-out.",
      studentIcon: BookOpen,
      teacherTitle: "Credentials Review",
      teacherDesc: "Educators apply to teach by submitting academic credentials and class blueprints, which are evaluated by administration.",
      teacherIcon: Users
    },
    {
      number: "02",
      studentTitle: "Hands-on Practice",
      studentDesc: "Students work on real assignments customized by their tutor, uploading work directly through their dynamic profile logs.",
      studentIcon: Code,
      teacherTitle: "Curriculum Design",
      teacherDesc: "Approved instructors create assignments, set deadlines, and configure active learning tracking structures.",
      teacherIcon: Palette
    },
    {
      number: "03",
      studentTitle: "Feedback Loop",
      studentDesc: "Tutors evaluate submissions and return detailed grades, and direct peer review cycles help scale practical engineering and UX habits.",
      studentIcon: CheckCircle2,
      teacherTitle: "Progress Diagnostics",
      teacherDesc: "Tutors track individual submissions and review dashboard grade distribution statistics to guide students effectively.",
      teacherIcon: TrendingUp
    },
    {
      number: "04",
      studentTitle: "Verified Career",
      studentDesc: "Graduates unlock professional career certifications and display proof-of-work profiles to direct hiring partners.",
      studentIcon: Award,
      teacherTitle: "Educational Brand",
      teacherDesc: "Tutors grow their global profile reach, accept student enrollment transactions, and build reliable class income streams.",
      teacherIcon: Briefcase
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

  // Fetch feedbacks dynamically from the server
  const { data: dbFeedbacks = [] } = useQuery({
    queryKey: ['feedbacks-home'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/feedbacks');
      return res.data;
    }
  });

  // Fetch accepted classes for popular listing
  const { data: homeClasses = [] } = useQuery({
    queryKey: ['home-classes-popular'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/classes');
      return res.data;
    }
  });

  // Sort and slice popular classes based on enrollment counts (only approved status classes)
  const popularClasses = [...homeClasses]
    .filter(c => c.status === 'accepted')
    .sort((a, b) => (b.total_enrollment || 0) - (a.total_enrollment || 0))
    .slice(0, 3);

  const fallbackPopularClasses = [
    {
      _id: "1",
      title: "React Frontend Architecture & Design",
      name: "Sarah Jenkins",
      price: 99,
      description: "Learn custom state management, performance scaling, and modern styling integrations with Tailwind CSS.",
      total_enrollment: 1248,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80"
    },
    {
      _id: "2",
      title: "Introduction to Figma UI/UX Layouts",
      name: "David Chen",
      price: 79,
      description: "Master modern wireframing, components, auto-layouts, and premium prototyping pipelines to build UX profiles.",
      total_enrollment: 830,
      image: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=600&q=80"
    },
    {
      _id: "3",
      title: "Data Science with Python & Pandas",
      name: "Dr. Amanda Vance",
      price: 129,
      description: "Analyze large-scale datasets, construct visual charts, and train introductory machine learning pipelines.",
      total_enrollment: 1850,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Fetch dynamic platform stats for Homepage statistics section
  const { data: platformStats = { totalUsers: 2428, totalClasses: 86, totalEnrollment: 15430 } } = useQuery({
    queryKey: ['platform-stats-home'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/platform-stats');
      return res.data;
    }
  });

  const resolvedPopularClasses = popularClasses.length > 0 ? popularClasses : fallbackPopularClasses;

  // Normalize feedback lists (using dynamic reviews or fallbacks)
  const resolvedFeedbacks = dbFeedbacks.length > 0
    ? dbFeedbacks.map(f => ({
        id: f._id,
        studentName: f.student_name,
        className: f.class_title,
        message: f.description,
        avatar: f.student_image
      }))
    : feedbacks;

  const [feedbackIndex, setFeedbackIndex] = useState(0);

  const handleFeedbackPrev = () => {
    setFeedbackIndex((prev) => (prev - 1 + resolvedFeedbacks.length) % resolvedFeedbacks.length);
  };

  const handleFeedbackNext = () => {
    setFeedbackIndex((prev) => (prev + 1) % resolvedFeedbacks.length);
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
    <div className="space-y-24 pb-24 bg-[#f8fafc]">
      {/* 1. Hero Banner / Carousel Section */}
      <section className="relative py-24 border-b border-slate-800 overflow-hidden bg-slate-950">
        {/* Full-width dynamic background image with transition */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
          </AnimatePresence>
        </div>

        {/* Primary Glass Overlay */}
        <div className="absolute inset-0 bg-brand-primary/65 backdrop-blur-xl z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side text details */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-secondary border border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
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
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                      {slides[currentSlide].title.split(" ").map((w, idx) => (
                        <span key={idx}>
                          {w === "Expert" || w === "Class" || w === "Career" ? (
                            <span className="text-teal-400">{w} </span>
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
                    className="absolute inset-0 text-slate-200 text-base md:text-lg max-w-xl leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6">
                <Link
                  to="/all-classes"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-secondary text-brand-primary font-extrabold rounded-soft hover:bg-brand-secondary/90 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-md"
                >
                  Explore Classes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/teach"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white border border-white/20 font-semibold rounded-soft hover:bg-white/20 active:scale-[0.99] transition-all duration-300 shadow-sm backdrop-blur-md"
                >
                  Become a Teacher
                </Link>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3 pt-6">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-white/20 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all shadow-sm"
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
                        currentSlide === idx ? 'w-6 bg-brand-secondary' : 'w-2.5 bg-white/30'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 border border-white/20 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all shadow-sm"
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

      {/* Platform Keywords Marquee */}
      <div className="bg-gradient-to-r from-brand-primary via-[#224b3b] to-brand-primary text-gray-300 py-5 shadow-lg border-y border-brand-teal/20 relative z-10">
        <SafeMarquee speed={60} gradient={false} play={true}>
          <div className="flex items-center gap-16 text-lg md:text-xl font-extrabold uppercase tracking-wider select-none pr-16">
            {[
              "Interactive Classes",
              "Industry Mentors",
              "Hands-on Projects",
              "Accredited Certifications",
              "Expert Code Reviews",
              "Real-time Feedback",
              "Dashboard Statistics",
              "UI/UX Design Tracks",
              "Full-stack Web Dev",
              "Tutor Verification Profile",
              "1-on-1 Class Collaboration"
            ].map((kw, idx) => (
              <div key={idx} className="flex items-center gap-4 whitespace-nowrap">
                <span className={idx % 2 === 0 ? 'text-brand-secondary' : 'text-teal-400'}>✦</span>
                <span>{kw}</span>
              </div>
            ))}
          </div>
        </SafeMarquee>
      </div>

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
                    <span className="block text-2xl font-extrabold text-brand-primary">
                      {platformStats.totalUsers ? platformStats.totalUsers.toLocaleString() : '0'}
                    </span>
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
                    <span className="block text-2xl font-extrabold text-brand-primary">
                      {platformStats.totalClasses ? platformStats.totalClasses.toLocaleString() : '0'}
                    </span>
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
                    <span className="block text-2xl font-extrabold text-brand-primary">
                      {platformStats.totalEnrollment ? platformStats.totalEnrollment.toLocaleString() : '0'}
                    </span>
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

      {/* 2. Pinned Sticky Scroll Parallax Roadmap Section */}
      <section ref={roadmapRef} className="relative h-[300vh] bg-slate-950  ">
        {/* Sticky viewport frame */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col justify-center">
          
          {/* Fixed Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 bg-fixed"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1920&q=80)'
            }}
          />
          
          {/* Dark Black Overlay Filter */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[4px] z-0" />

          {/* Centered Contents */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-[85%] relative z-10 flex flex-col justify-between">
            
            {/* Header Area */}
            <div className="text-center space-y-2 mb-4">
              <span className="text-[10px] uppercase tracking-widest text-brand-secondary font-black bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md inline-block">
                Interactive Roadmaps
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                The Journey on <span className="text-brand-secondary">SkilledIn</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                Scroll to move the flag and see how student expertise and teacher careers grow side-by-side.
              </p>
            </div>

            {/* Column Headers */}
            <div className="hidden lg:grid grid-cols-12 gap-4 mb-2 z-10">
              <div className="col-span-5 text-center">
                <span className="text-gray-200 font-extrabold uppercase tracking-widest text-teal-400">Student Journey</span>
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-5 text-center">
                <span className="text-gray-200 font-extrabold uppercase tracking-widest text-brand-secondary">Teacher Journey</span>
              </div>
            </div>

            {/* Path and Cards Container */}
            <div className="relative flex-grow hidden lg:grid grid-cols-12 gap-4 items-center">
              
              {/* Left Column: Student Cards */}
              <div className="col-span-5 relative h-full flex flex-col justify-between py-6">
                {journeySteps.map((step, idx) => {
                  const Icon = step.studentIcon;
                  const ranges = [
                    [0.0, 0.125, 0.325],
                    [0.175, 0.375, 0.575],
                    [0.425, 0.625, 0.825],
                    [0.675, 0.875, 1.0]
                  ];
                  
                  // Custom opacity transform centered around stepProgress
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const opacity = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    [0.45, 1, 0.45]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const scale = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    [0.98, 1.03, 0.98]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const cardBg = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.05)"]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const cardTextColor = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.4)"]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const borderOpacity = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(255, 255, 255, 0.08)", "rgba(226, 183, 74, 0.4)", "rgba(255, 255, 255, 0.08)"] // gold border when active
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const iconColor = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(226, 183, 74, 0.4)", "rgba(226, 183, 74, 1)", "rgba(226, 183, 74, 0.4)"]
                  );

                  return (
                    <motion.div
                      key={`student-${idx}`}
                      style={{ opacity, scale, backgroundColor: cardBg, borderColor: borderOpacity }}
                      className="border p-4 sm:p-5 rounded-soft backdrop-blur-md text-left flex gap-4 items-center shadow-2xl relative"
                    >
                      <motion.div 
                        style={{ color: iconColor }}
                        className="p-2 bg-brand-secondary/15 rounded-soft flex-shrink-0"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <div className="space-y-0.5">
                        <motion.h4
                          style={{ color: cardTextColor }}
                          className="font-black text-base sm:text-lg md:text-xl tracking-tight"
                        >
                          {step.studentTitle}
                        </motion.h4>
                      </div>

                      {/* Message box tail */}
                      <motion.div 
                        style={{ backgroundColor: cardBg, borderColor: borderOpacity, opacity }}
                        className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t border-r z-10"
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Middle Column: Curved SVG path + Pinned Flag indicator */}
              <div className="col-span-2 relative h-full flex justify-center items-center">
                {/* SVG Curve */}
                <div className="absolute inset-y-0 w-24 flex justify-center">
                  <svg viewBox="0 0 100 600" fill="none" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    {/* Background curve path */}
                    <path 
                      d="M 50,0 Q 85,150 50,300 T 50,600" 
                      stroke="rgba(255,255,255,0.12)" 
                      strokeWidth="4" 
                      strokeDasharray="6 8" 
                    />
                    {/* Animated drawing path */}
                    <motion.path 
                      d="M 50,0 Q 85,150 50,300 T 50,600" 
                      stroke="#e2b74a" // brand-secondary gold
                      strokeWidth="4" 
                      strokeDasharray="6 8" 
                      style={{ pathLength: scrollYProgress }}
                    />
                  </svg>
                </div>

                {/* Nodes on path */}
                {journeySteps.map((step, idx) => {
                  const nodeY = ["12.5%", "37.5%", "62.5%", "87.5%"][idx];
                  const nodeX = ["58%", "58%", "42%", "42%"][idx]; // matches curve shape Q/T peaks

                  return (
                    <div 
                      key={`node-${idx}`}
                      className="absolute w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-xs font-black text-slate-300 z-10 shadow-lg shadow-black/50"
                      style={{ top: nodeY, left: nodeX, transform: "translate(-50%, -50%)" }}
                    >
                      {step.number}
                    </div>
                  );
                })}

                {/* Floating Flag Indicator */}
                <motion.div
                  className="absolute w-8 h-8 bg-brand-secondary text-brand-primary rounded-full flex items-center justify-center shadow-2xl border border-white/20 z-20"
                  style={{ 
                    top: indicatorY, 
                    left: indicatorX, 
                    transform: "translate(-50%, -50%)" 
                  }}
                >
                  <Flag className="w-4 h-4 fill-brand-primary text-brand-primary stroke-[2.5]" />
                </motion.div>

              </div>

              {/* Right Column: Teacher/Tutor Cards */}
              <div className="col-span-5 relative h-full flex flex-col justify-between py-6">
                {journeySteps.map((step, idx) => {
                  const Icon = step.teacherIcon;
                  const ranges = [
                    [0.0, 0.125, 0.325],
                    [0.175, 0.375, 0.575],
                    [0.425, 0.625, 0.825],
                    [0.675, 0.875, 1.0]
                  ];

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const opacity = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    [0.45, 1, 0.45]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const scale = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    [0.98, 1.03, 0.98]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const cardBg = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.05)"]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const cardTextColor = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.4)"]
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const borderOpacity = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(255, 255, 255, 0.08)", "rgba(226, 183, 74, 0.4)", "rgba(255, 255, 255, 0.08)"] // gold border when active
                  );

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const iconColor = useTransform(
                    scrollYProgress,
                    ranges[idx],
                    ["rgba(226, 183, 74, 0.4)", "rgba(226, 183, 74, 1)", "rgba(226, 183, 74, 0.4)"]
                  );

                  return (
                    <motion.div
                      key={`teacher-${idx}`}
                      style={{ opacity, scale, backgroundColor: cardBg, borderColor: borderOpacity }}
                      className="border p-4 sm:p-5 rounded-soft backdrop-blur-md text-left flex gap-4 items-center shadow-2xl relative"
                    >
                      <motion.div 
                        style={{ color: iconColor }}
                        className="p-2 bg-brand-secondary/15 rounded-soft flex-shrink-0"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <div className="space-y-0.5">
                        <motion.h4
                          style={{ color: cardTextColor }}
                          className="font-black text-base sm:text-lg md:text-xl tracking-tight"
                        >
                          {step.teacherTitle}
                        </motion.h4>
                      </div>

                      {/* Message box tail */}
                      <motion.div 
                        style={{ backgroundColor: cardBg, borderColor: borderOpacity, opacity }}
                        className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-l border-b z-10"
                      />
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Mobile/Tablet fallback list */}
            <div className="lg:hidden flex-grow overflow-y-auto space-y-8 py-4">
              {journeySteps.map((step, idx) => {
                const StudentIcon = step.studentIcon;
                const TeacherIcon = step.teacherIcon;
                return (
                  <div key={`mobile-${idx}`} className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-soft backdrop-blur-md text-left">
                    <div className="flex items-center gap-3 text-brand-secondary font-black text-sm">
                      <span className="px-2 py-0.5 bg-brand-secondary/20 text-brand-secondary rounded text-xs">{step.number}</span>
                      <span>Milestone Step</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Student Part */}
                      <div className="flex items-center gap-3 border-l-2 border-teal-400/50 pl-3">
                        <StudentIcon className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                        <h4 className="font-black text-white text-base sm:text-lg">
                          {step.studentTitle} (Student)
                        </h4>
                      </div>

                      {/* Teacher Part */}
                      <div className="flex items-center gap-3 border-l-2 border-brand-secondary/50 pl-3">
                        <TeacherIcon className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                        <h4 className="font-black text-white text-base sm:text-lg">
                          {step.teacherTitle} (Tutor)
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Popular Classes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold">Trending Education</span>
            <h2 className="text-3xl font-bold tracking-tight text-brand-primary">Our Popular Classes</h2>
            <p className="text-slate-500">
              Explore our highest enrolled courses curated by verified industry specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {resolvedPopularClasses.map((item) => (
              <motion.div
                key={item._id}
                variants={fadeUp}
                className="bg-white border border-slate-150 rounded-soft overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.01] hover:border-brand-teal/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-brand-primary/95 text-brand-secondary text-xs font-extrabold px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                    ${item.price}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-brand-teal bg-brand-teal/5 px-2 py-0.5 rounded-full border border-brand-teal/10 inline-block">
                      Mentor: {item.name}
                    </span>
                    <h3 className="text-lg font-bold text-brand-primary leading-snug line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="text-xs text-slate-400 font-semibold">
                      Enrolled: <strong className="text-brand-primary">{item.total_enrollment || 0}</strong> Students
                    </div>
                    <Link
                      to={`/class/${item._id}`}
                      className="px-4 py-2 bg-brand-primary text-white hover:bg-brand-primary/95 text-xs font-bold rounded-soft hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
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
                const item = resolvedFeedbacks[(feedbackIndex + offset) % resolvedFeedbacks.length];
                if (!item) return null;
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
                      <span className="block font-bold text-brand-primary text-base line-clamp-1">
                        {item.className}
                      </span>
                      <p className="text-sm text-slate-650 italic leading-relaxed line-clamp-5">
                        "{item.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 mt-auto">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.studentName}
                          className="w-10 h-10 rounded-full object-cover border border-brand-teal/20 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-brand-teal/20 flex items-center justify-center text-slate-500">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-brand-primary text-sm leading-none line-clamp-1">{item.studentName}</h4>
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
                {resolvedFeedbacks.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFeedbackIndex(idx % resolvedFeedbacks.length)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (feedbackIndex % resolvedFeedbacks.length) === idx ? 'w-5 bg-brand-teal' : 'w-2 bg-slate-300'
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
      <section className="relative py-24 bg-brand-primary overflow-hidden text-white">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px] z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side Graphic representation with Unsplash Tutor photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
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
                    <h4 className="font-bold text-white">Mentor Invitation Console</h4>
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
              className="lg:col-span-7 text-left space-y-6"
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
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-brand-secondary text-brand-primary font-extrabold rounded-soft hover:bg-brand-secondary/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
