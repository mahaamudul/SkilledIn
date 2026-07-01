import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Sign In Successful! Welcome back.");
      navigate('/dashboard/profile');
    } catch (error) {
      console.error(error);
      toast.error(`Sign In Failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google Sign In Successful! Welcome.");
      navigate('/dashboard/profile');
    } catch (error) {
      console.error(error);
      toast.error(`Google Sign In Failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Panel: Desktop visual display with Unsplash image & gradient overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-primary overflow-hidden justify-center items-center text-left">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out hover:scale-105"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80)' }}
        />
        {/* Pinned gradient overlay with blend mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c3b2f]/95 via-[#1c3b2f]/90 to-brand-teal/80 mix-blend-multiply z-10" />

        <div className="relative z-20 max-w-lg px-12 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Accredited Learning Platform
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Master new skills with <span className="text-brand-secondary">industry experts</span>.
          </h2>
          <p className="text-slate-200 leading-relaxed text-sm lg:text-base">
            Join SkilledIn to accelerate your professional growth, coordinate tasks, complete structured projects, and obtain certified evaluations.
          </p>
          <div className="flex gap-4 pt-4 text-xs font-bold text-slate-300">
            <div className="flex gap-1.5 items-center">
              <GraduationCap className="w-4 h-4 text-brand-secondary" />
              1,200+ Classes
            </div>
            <div className="h-4 w-px bg-white/25" />
            <div>24,000+ Enrolled Students</div>
          </div>
        </div>
      </div>

      {/* Right Panel: Spacious minimal workspace form layout */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white border border-slate-150 p-8 rounded-soft shadow-lg space-y-6 text-left"
        >
          {/* Logo Header for mobile context */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-brand-primary">Welcome Back</h1>
              <p className="text-slate-400 text-xs mt-1">Please enter your authorization credentials.</p>
            </div>
            <Link to="/" className="p-1.5 bg-slate-50 text-slate-650 rounded-soft border border-slate-100 lg:hidden">
              <GraduationCap className="w-5 h-5 text-brand-teal" />
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all shadow-sm"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all shadow-sm"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-primary text-white font-semibold rounded-soft hover:bg-brand-primary/95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-6 shadow-sm"
            >
              Sign In
              <ArrowRight className="w-4 h-4 text-brand-secondary" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-150" />
            </div>
            <span className="relative px-3 bg-white text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Or Continue With
            </span>
          </div>

          {/* Social Sign-in Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 bg-white border border-slate-250 hover:bg-slate-50 text-slate-655 font-semibold rounded-soft text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {/* Custom Google SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            Google Identity
          </button>

          {/* Redirection link */}
          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-brand-teal hover:underline">
                Sign Up
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
