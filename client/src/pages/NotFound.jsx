import React from 'react';
import { Home, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="p-4 bg-brand-primary/5 text-brand-primary rounded-full mb-6">
        <Compass className="w-12 h-12 stroke-[1.5]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-8">
        Sorry, we couldn't find the page you are looking for. The page might have been removed, renamed, or doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white font-semibold rounded-soft hover:bg-brand-primary/95 transition-all shadow-sm"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
