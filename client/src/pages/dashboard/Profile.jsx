import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  Award, 
  Lock, 
  Plus, 
  Trash2, 
  PlusCircle, 
  X, 
  GraduationCap, 
  Sparkles,
  Briefcase,
  FileText,
  Edit3,
  Check
} from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, role } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubTab = searchParams.get('tab') || 'personal';
  const queryClient = useQueryClient();

  // Personal details states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalEmail, setAdditionalEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  // Academic history states
  const [academicHistory, setAcademicHistory] = useState([]);

  // Professional & Skills states
  const [currentJob, setCurrentJob] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState('');
  const [isEditingProfessional, setIsEditingProfessional] = useState(false);

  // Fetch current user details via TanStack Query
  const { data: profile } = useQuery({
    queryKey: ['user-profile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`http://localhost:5000/users/current?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  // Save changes via TanStack Mutation
  const mutation = useMutation({
    mutationFn: async (updatedPayload) => {
      const res = await axios.patch('http://localhost:5000/users/update-profile', updatedPayload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Profile details saved successfully!');
      // Real-time invalidation to trigger sidebar and unlock state updates
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
    onError: (err) => {
      toast.error(`Update failed: ${err.message}`);
    }
  });

  // Sync state values on load or update
  useEffect(() => {
    if (profile) {
      setName(profile.personalInfo?.name || user?.displayName || '');
      setPhone(profile.personalInfo?.phone || '');
      setAdditionalEmail(profile.personalInfo?.additionalEmail || '');
      setAvatar(profile.personalInfo?.avatar || user?.photoURL || '');
      setAcademicHistory(Array.isArray(profile.education) ? profile.education : []);
      setCurrentJob(profile.professionalInfo?.currentJob || '');
      setSkills(Array.isArray(profile.professionalInfo?.skills) ? profile.professionalInfo.skills : []);
      setBio(profile.professionalInfo?.bio || '');

      const hasProfessional = !!(
        profile.professionalInfo?.currentJob || 
        profile.professionalInfo?.bio || 
        (profile.professionalInfo?.skills && profile.professionalInfo.skills.length > 0)
      );
      setIsEditingProfessional(!hasProfessional);
    }
  }, [profile, user]);

  // Submit handlers
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: user.email,
      personalInfo: {
        name,
        phone,
        additionalEmail,
        avatar
      }
    });
  };

  const handleAcademicSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: user.email,
      education: academicHistory
    });
  };

  const handleProfessionalSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: user.email,
      professionalInfo: {
        currentJob,
        skills,
        bio
      }
    }, {
      onSuccess: () => {
        setIsEditingProfessional(false);
      }
    });
  };

  // Academic dynamic rows
  const addAcademicRow = () => {
    setAcademicHistory([...academicHistory, { institution: '', degree: '', passingYear: '' }]);
  };

  const removeAcademicRow = (idxToRem) => {
    const updated = academicHistory.filter((_, idx) => idx !== idxToRem);
    setAcademicHistory(updated);
    mutation.mutate({
      email: user.email,
      education: updated
    });
  };

  const handleAcademicRowChange = (idx, field, val) => {
    const updated = [...academicHistory];
    updated[idx] = { ...updated[idx], [field]: val };
    setAcademicHistory(updated);
  };

  // Skills tag handling
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      setSkills([...skills, skillsInput.trim()]);
      setSkillsInput('');
    }
  };

  const handleRemoveSkill = (skillToRem) => {
    setSkills(skills.filter(s => s !== skillToRem));
  };

  // Determine if a tab is locked
  const profileCompletion = profile?.profileCompletePercent ?? 0;
  const isLocked = profileCompletion < 60;

  return (
    <div className="space-y-6 text-left max-w-4xl relative">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-brand-teal" />
            Profile Management
          </h2>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Consolidate and verify your details to complete your SkilledIn identity verification badge.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#e2b74a]/10 border border-[#e2b74a]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-secondary">
          <Sparkles className="w-3.5 h-3.5" />
          Overall Completion: {profileCompletion}%
        </div>
      </div>

      {/* Main Workspace Panels */}
      <div className="relative bg-white border border-slate-200 rounded-soft shadow-sm p-6 sm:p-8 min-h-[450px] flex flex-col justify-between">
        
        {/* Validation Gate Overlay Lock */}
        {isLocked && activeSubTab !== 'personal' && (
          <div className="absolute inset-0 z-20 backdrop-blur-sm bg-white/40 rounded-soft flex flex-col justify-center items-center text-center p-8 pointer-events-auto">
            <div className="p-4 bg-white border border-slate-200 rounded-full shadow-md mb-4 text-[#e2b74a]">
              <Lock className="w-10 h-10 animate-pulse" />
            </div>
            <h3 className="text-brand-primary text-sm font-black max-w-xl leading-relaxed">
              🔒 Required Action: Please finish your Required Personal Details (Name, Phone, Additional Email) to hit 60% completion and unlock these advanced profile sections.
            </h3>
            <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-250 rounded-full text-xs font-bold text-slate-650">
              <Sparkles className="w-3.5 h-3.5 text-[#e2b74a]" />
              Current Profile Completion: {profileCompletion}% / 60% Required
            </div>
            <button 
              onClick={() => setSearchParams({ tab: 'personal' })}
              className="mt-6 px-6 py-2.5 bg-brand-primary text-white text-xs font-black uppercase tracking-wider rounded-soft shadow-md hover:bg-brand-primary/95 active:scale-95 transition-all"
            >
              Fill Personal Details
            </button>
          </div>
        )}

        {/* Tab 1: Personal Info Tab */}
        {activeSubTab === 'personal' && (
          <form onSubmit={handlePersonalSubmit} className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-brand-primary border-b border-slate-100 pb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-teal" />
                Personal Identification details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-soft text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-soft text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Additional Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="alternative@domain.com"
                  value={additionalEmail}
                  onChange={(e) => setAdditionalEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-soft text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm text-slate-700"
                />
              </div>
            </div>

            {/* Placeholder Photo Frame with + Upload trigger */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Avatar Photo Frame <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group cursor-pointer w-20 h-20 rounded-full border-2 border-dashed border-slate-350 flex items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-brand-teal transition-all shadow-sm">
                  {avatar ? (
                    <img 
                      src={avatar} 
                      alt="Profile preview" 
                      className="w-full h-full rounded-full object-cover" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
                      }}
                    />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400 group-hover:text-brand-teal group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <div className="flex-1 w-full space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-brand-primary">Configure User Avatar Link</h4>
                  <p className="text-xs text-slate-400 pb-1">Paste a web link to set your custom avatar photo above.</p>
                  <input 
                    type="text" 
                    placeholder="https://unsplash.com/photos/yourphoto (optional)"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-soft text-xs focus:outline-none focus:ring-1 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button 
                type="submit"
                disabled={mutation.isPending}
                className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-black uppercase tracking-wider rounded-soft hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm disabled:opacity-50"
              >
                {mutation.isPending ? 'Updating...' : 'Update Personal Info'}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Academic History View */}
        {activeSubTab === 'academic' && (
          <form onSubmit={handleAcademicSubmit} className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-brand-primary flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-teal" />
                Academic History Record
              </h3>
              <button
                type="button"
                onClick={addAcademicRow}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold rounded-soft transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-brand-teal" />
                Add Education
              </button>
            </div>

            {academicHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 bg-slate-50 rounded-soft border border-dashed border-slate-200">
                <GraduationCap className="w-12 h-12 stroke-[1.2] mb-3 text-slate-300" />
                <h4 className="font-bold text-sm text-slate-500">No Education Records Yet</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">Click the Add Education button above to log your institutions, degree majors, and completion years.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {academicHistory.map((item, idx) => (
                  <div key={`academic-${idx}`} className="flex gap-4 p-4 border border-slate-150 bg-slate-50/50 rounded-soft relative group">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Institution</label>
                        <input 
                          type="text" 
                          required
                          placeholder="University of Oxford"
                          value={item.institution}
                          onChange={(e) => handleAcademicRowChange(idx, 'institution', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-soft text-xs focus:outline-none focus:border-brand-teal transition-all text-slate-700 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Degree</label>
                        <input 
                          type="text" 
                          required
                          placeholder="B.Sc. Computer Science"
                          value={item.degree}
                          onChange={(e) => handleAcademicRowChange(idx, 'degree', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-soft text-xs focus:outline-none focus:border-brand-teal transition-all text-slate-700 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Passing Year</label>
                        <input 
                          type="text" 
                          required
                          placeholder="2025"
                          value={item.passingYear}
                          onChange={(e) => handleAcademicRowChange(idx, 'passingYear', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-soft text-xs focus:outline-none focus:border-brand-teal transition-all text-slate-700 font-semibold"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeAcademicRow(idx)}
                      className="mt-5 p-2 text-red-500 hover:bg-red-50 rounded-soft border border-transparent hover:border-red-200 transition-all self-start"
                      aria-label="Remove academic row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-6 border-t border-slate-100">
              <button 
                type="submit"
                disabled={mutation.isPending}
                className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/95 disabled:opacity-40 disabled:hover:scale-100 text-white text-xs font-black uppercase tracking-wider rounded-soft hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm"
              >
                {mutation.isPending ? 'Saving...' : 'Save Academic Credentials'}
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Professional & Skills View */}
        {activeSubTab === 'skills' && (
          <form onSubmit={handleProfessionalSubmit} className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-brand-primary flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-teal" />
                Professional & Skills details
              </h3>
              
              {!isEditingProfessional ? (
                <button
                  type="button"
                  onClick={() => setIsEditingProfessional(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-650 border border-slate-200 text-xs font-bold rounded-soft transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-brand-teal" />
                  Edit Details
                </button>
              ) : (
                (profile?.professionalInfo?.currentJob || profile?.professionalInfo?.bio || profile?.professionalInfo?.skills?.length > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentJob(profile.professionalInfo?.currentJob || '');
                      setSkills(profile.professionalInfo?.skills || []);
                      setBio(profile.professionalInfo?.bio || '');
                      setIsEditingProfessional(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-soft transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel Edit
                  </button>
                )
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-505 mb-1.5">
                  Current Job/Occupation
                </label>
                <input 
                  type="text" 
                  disabled={!isEditingProfessional}
                  placeholder="Software Engineer at Google"
                  value={currentJob}
                  onChange={(e) => setCurrentJob(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border border-slate-200 rounded-soft text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm text-slate-700 font-semibold"
                />
              </div>

              {/* Skills Tag block */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-505 mb-1.5">
                  Skills & Certifications
                </label>
                
                {/* Input with Add button */}
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    disabled={!isEditingProfessional}
                    placeholder="React, MongoDB, Node.js"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
                          setSkills([...skills, skillsInput.trim()]);
                          setSkillsInput('');
                        }
                      }
                    }}
                    className="flex-1 px-4 py-2.5 bg-white disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border border-slate-200 rounded-soft text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm text-slate-700 font-semibold"
                  />
                  <button
                    type="button"
                    disabled={!isEditingProfessional}
                    onClick={(e) => {
                      e.preventDefault();
                      if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
                        setSkills([...skills, skillsInput.trim()]);
                        setSkillsInput('');
                      }
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-250 text-slate-705 text-xs font-bold rounded-soft transition-all"
                  >
                    Add
                  </button>
                </div>

                {/* Displaying tags */}
                {skills.length === 0 ? (
                  <p className="text-slate-400 text-xs italic">No skills listed yet. Type above and press Add.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-soft border border-slate-200">
                    {skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-teal/10 text-brand-teal border border-brand-teal/20 shadow-sm"
                      >
                        {skill}
                        {isEditingProfessional && (
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-505 mb-1.5">
                  Professional Bio
                </label>
                <textarea
                  rows={4}
                  disabled={!isEditingProfessional}
                  placeholder="Describe your credentials, skills, projects, and educational achievements..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed border border-slate-200 rounded-soft text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all shadow-sm text-slate-705 font-medium leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {isEditingProfessional ? (
                <button 
                  type="submit"
                  disabled={mutation.isPending}
                  className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-black uppercase tracking-wider rounded-soft hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm disabled:opacity-50"
                >
                  {mutation.isPending ? 'Saving...' : 'Save Professional Profile'}
                </button>
              ) : (
                <button 
                  type="button"
                  disabled
                  className="px-6 py-2.5 bg-slate-100 border border-slate-200 text-slate-400 text-xs font-black uppercase tracking-wider rounded-soft transition-all flex items-center gap-1.5 cursor-not-allowed"
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  Profile Saved
                </button>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
