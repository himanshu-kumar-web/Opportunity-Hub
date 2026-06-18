'use client';

import React, { useState } from 'react';
import { CATEGORY_LABELS } from '@/data/mockData';
import { 
  Send, Sparkles, AlertCircle, ArrowRight, CheckCircle2,
  FileText, GraduationCap, Briefcase, Trophy, Link as LinkIcon 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubmitOpportunityPage() {
  // Form fields
  const [oppType, setOppType] = useState('scholarship');
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [categories, setCategories] = useState([]);
  
  // Extra fields based on type
  const [mode, setMode] = useState('Remote'); // for internships
  const [duration, setDuration] = useState(''); // for internships

  // Submission Status
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleCategoryCheckbox = (catKey) => {
    setCategories(prev => {
      if (prev.includes(catKey)) {
        return prev.filter(c => c !== catKey);
      } else {
        return [...prev, catKey];
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('submitting');

    // 1. Validations
    if (!title || !provider || !deadline || !applyLink || !eligibility) {
      setErrorMsg('All main fields are required.');
      setStatus('error');
      return;
    }

    if (!applyLink.startsWith('http://') && !applyLink.startsWith('https://')) {
      setErrorMsg('Please enter a valid URL starting with http:// or https://');
      setStatus('error');
      return;
    }

    if (categories.length === 0) {
      setErrorMsg('Please select at least one applicable education level.');
      setStatus('error');
      return;
    }

    // Mock API delay
    setTimeout(() => {
      // Explode confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setStatus('success');
      
      // Reset form
      setTitle('');
      setProvider('');
      setAmount('');
      setDeadline('');
      setEligibility('');
      setApplyLink('');
      setCategories([]);
      setDuration('');
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {status === 'success' ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="h-16 w-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-brand-orange shadow-inner">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-textNavy tracking-tight">Opportunity Submitted!</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Thank you for contributing! Your submission has been sent to our moderators for verification and will appear on the portal within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-xl font-bold shadow-md transition-smooth text-xs"
          >
            Submit Another Listing
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="border-b border-slate-100 pb-6 mb-8">
            <h1 className="text-2xl font-extrabold text-brand-textNavy tracking-tight flex items-center gap-2">
              <Send className="h-6 w-6 text-brand-orange" />
              <span>Submit Opportunity</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">Discovered a new scholarship, scheme, or internship? List it here to assist other students.</p>
          </div>

          {status === 'error' && (
            <div className="flex gap-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold mb-6">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Type selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Opportunity Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'scholarship', label: 'Scholarship', icon: <GraduationCap className="h-4 w-4" /> },
                  { key: 'scheme', label: 'Gov Scheme', icon: <FileText className="h-4 w-4" /> },
                  { key: 'internship', label: 'Internship', icon: <Briefcase className="h-4 w-4" /> },
                  { key: 'competition', label: 'Hackathon', icon: <Trophy className="h-4 w-4" /> }
                ].map((opt) => {
                  const isActive = oppType === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setOppType(opt.key)}
                      className={`flex items-center gap-2 p-3.5 rounded-xl border text-sm font-semibold transition-smooth text-left ${
                        isActive 
                          ? 'border-brand-orange bg-orange-50/50 text-brand-orange font-bold ring-1 ring-brand-orange' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-350 bg-slate-50'
                      }`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* General Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Opportunity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NSP Post-Matric Scholarship"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-slate-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Provider / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ministry of Minority Affairs / Google"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-slate-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {oppType === 'internship' ? 'Stipend (₹/month)' : 'Funding / Prize Value (₹)'}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-slate-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deadline Date</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-slate-50/30 text-slate-600"
                />
              </div>
            </div>

            {/* Type Specific Fields */}
            {oppType === 'internship' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4.5 rounded-2xl border border-slate-150">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Working Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-700"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Months"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm bg-white"
                  />
                </div>
              </div>
            )}

            {/* Link and Eligibility */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Application Portal Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="url"
                    required
                    placeholder="https://scholarships.gov.in"
                    value={applyLink}
                    onChange={(e) => setApplyLink(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-slate-50/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Eligibility Requirements</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Who is eligible? e.g. Open to girls pursuing engineering in 1st year with family income < 6 LPA."
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-slate-50/30"
                />
              </div>
            </div>

            {/* Eligible levels */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Applicable Education Categories</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-slate-200 rounded-2xl p-4 bg-slate-50/30">
                {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`chk-${key}`}
                      checked={categories.includes(key)}
                      onChange={() => handleCategoryCheckbox(key)}
                      className="h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                    />
                    <label htmlFor={`chk-${key}`} className="text-xs font-semibold text-slate-650 cursor-pointer">
                      {val}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-brand-orange hover:bg-brand-orangeHover disabled:bg-slate-400 text-white font-bold py-3.5 rounded-xl shadow-md transition-smooth flex items-center justify-center gap-1 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>{status === 'submitting' ? 'Submitting opportunity...' : 'Submit Listing for Approval'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
