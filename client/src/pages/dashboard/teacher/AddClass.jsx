import React, { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Send, FileText, Loader2 } from 'lucide-react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

export default function AddClass() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const addClassMutation = useMutation({
    mutationFn: async (classData) => {
      const res = await axiosSecure.post('/classes', classData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Class saved as Pending and sent to admin for approval!');
      queryClient.invalidateQueries({ queryKey: ['classes', user?.email] });
      navigate('/dashboard/my-classes');
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(`Failed to submit class: ${msg}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    addClassMutation.mutate({
      title,
      name: user.displayName || 'Active Teacher',
      email: user.email,
      price: parseFloat(price),
      description,
      image: image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    });
  };

  return (
    <div className="max-w-xl mx-auto text-left">
      <div className="bg-white border border-slate-200/80 rounded-soft p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-soft">
            <FileText className="w-6 h-6 text-brand-teal" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-primary">Create New Class Curriculum</h2>
            <p className="text-slate-500 text-xs">Complete details below. Saved as pending by default.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Class Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Advanced React Design Systems"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Class Price ($ USD)
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 99"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Banner Image URL
              </label>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="e.g. https://images.com/banner.png"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Instructor Name
            </label>
            <input
              type="text"
              disabled
              value={user?.displayName || 'Active Teacher'}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-soft text-sm text-slate-550 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Instructor Email
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-soft text-sm text-slate-555 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Course Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline course materials, required tool stacks, and lesson topics..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-soft focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={addClassMutation.isPending}
            className="w-full py-2.5 bg-brand-primary text-white font-semibold rounded-soft hover:bg-brand-primary/95 transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
          >
            {addClassMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Curriculum...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Class for Admin Audit
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
