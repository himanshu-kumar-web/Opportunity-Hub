'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  scholarships, schemes, loans, internships, 
  competitions, courses, CATEGORY_LABELS 
} from '@/data/mockData';
import { 
  Search, Bookmark, BookmarkCheck, Share2, 
  ExternalLink, GraduationCap, BookOpen, Landmark, 
  Briefcase, Trophy, BookOpenCheck, CheckCircle2, ChevronRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GlobalSearchPage() {
  const { selectedCategory, toggleBookmark, isBookmarked } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const [useProfileFilter, setUseProfileFilter] = useState(true);

  // Trigger toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBookmarkToggle = (type, item) => {
    const isSaved = isBookmarked(type, item.id);
    toggleBookmark(type, item.id, item);
    if (!isSaved) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
      triggerToast(`Saved item to your dashboard!`);
    } else {
      triggerToast(`Removed item from saved list.`);
    }
  };

  const handleShare = (type, item) => {
    const route = type === 'scholarship' ? 'scholarships' 
                : type === 'scheme' ? 'schemes'
                : type === 'loan' ? 'loans'
                : type === 'internship' ? 'internships'
                : type === 'competition' ? 'competitions'
                : 'courses';
    const shareUrl = `${window.location.origin}/${route}?id=${item.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => triggerToast('Link copied to clipboard!'))
      .catch((err) => console.error(err));
  };

  // Compile items with normalized structures
  const allItems = [
    ...scholarships.map(s => ({ ...s, searchType: 'scholarship', searchLabel: 'Scholarship', title: s.name, details: s.eligibility, location: s.state, icon: <GraduationCap className="h-4 w-4 text-brand-orange" />, color: 'text-brand-orange bg-orange-50' })),
    ...schemes.map(sc => ({ ...sc, searchType: 'scheme', searchLabel: 'Gov Scheme', title: sc.name, details: sc.eligibility, location: sc.type + ' Scheme', icon: <BookOpen className="h-4 w-4 text-blue-500" />, color: 'text-blue-500 bg-blue-50' })),
    ...loans.map(l => ({ ...l, searchType: 'loan', searchLabel: 'Education Loan', title: l.bank_name, details: `Max Amount: ₹${(l.max_amount/100000).toFixed(0)} Lakhs | Rate: ${l.interest_rate}% p.a.`, location: l.type, icon: <Landmark className="h-4 w-4 text-emerald-500" />, color: 'text-emerald-500 bg-emerald-50' })),
    ...internships.map(i => ({ ...i, searchType: 'internship', searchLabel: 'Internship', title: `${i.domain} Intern at ${i.company}`, details: `Stipend: ${i.stipend > 0 ? '₹' + i.stipend : 'Unpaid'} | Duration: ${i.duration}`, location: i.mode, icon: <Briefcase className="h-4 w-4 text-purple-500" />, color: 'text-purple-500 bg-purple-50' })),
    ...competitions.map(c => ({ ...c, searchType: 'competition', searchLabel: 'Hackathon / Contest', title: c.name, details: `Prize Pool: ₹${c.prize.toLocaleString('en-IN')} | Eligibility: ${c.eligibility}`, location: c.type, icon: <Trophy className="h-4 w-4 text-yellow-500" />, color: 'text-yellow-500 bg-yellow-50' })),
    ...courses.map(co => ({ ...co, searchType: 'course', searchLabel: 'Course / Cert', title: co.title, details: `Provider: ${co.provider} | Cost: ${co.cost}`, location: co.domain, icon: <BookOpenCheck className="h-4 w-4 text-sky-500" />, color: 'text-sky-500 bg-sky-50' })),
  ];

  // Apply filters
  const searchResults = allItems.filter(item => {
    // 1. Profile filter
    if (useProfileFilter && selectedCategory && item.categories) {
      if (!item.categories.includes(selectedCategory)) return false;
    }

    // 2. Search Query filter
    const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
    const detailsMatch = item.details && item.details.toLowerCase().includes(query.toLowerCase());
    const locationMatch = item.location && item.location.toLowerCase().includes(query.toLowerCase());
    const queryMatch = titleMatch || detailsMatch || locationMatch;

    if (query && !queryMatch) return false;

    // 3. Tab filter
    if (activeTab !== 'all' && item.searchType !== activeTab) return false;

    return true;
  });

  // Count matches
  const counts = {
    all: searchResults.length,
    scholarship: searchResults.filter(i => i.searchType === 'scholarship').length,
    scheme: searchResults.filter(i => i.searchType === 'scheme').length,
    loan: searchResults.filter(i => i.searchType === 'loan').length,
    internship: searchResults.filter(i => i.searchType === 'internship').length,
    competition: searchResults.filter(i => i.searchType === 'competition').length,
    course: searchResults.filter(i => i.searchType === 'course').length,
  };

  const tabs = [
    { key: 'all', label: 'All Results' },
    { key: 'scholarship', label: 'Scholarships' },
    { key: 'scheme', label: 'Gov Schemes' },
    { key: 'loan', label: 'Loans' },
    { key: 'internship', label: 'Internships' },
    { key: 'competition', label: 'Hackathons' },
    { key: 'course', label: 'Courses' }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 transition-smooth animate-float-less text-sm">
          <CheckCircle2 className="h-4 w-4 text-brand-orange" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-brand-textNavy tracking-tight">Global Search Hub</h1>
        <p className="text-sm text-slate-500 mt-1.5">Search site-wide across all 500+ student scholarships, internships, hackathons, and certifications.</p>
        
        {/* Search Bar */}
        <div className="relative mt-6 shadow-sm">
          <Search className="absolute left-4 top-4.5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Type keywords (e.g. Python, Government, Reliance, remote)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-base transition-smooth bg-white"
            autoFocus
          />
        </div>

        {/* Profile Filter Toggle */}
        {selectedCategory && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="profileFilterToggle"
              checked={useProfileFilter}
              onChange={(e) => setUseProfileFilter(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
            />
            <label htmlFor="profileFilterToggle" className="text-xs font-semibold text-slate-500 cursor-pointer">
              Filter results matching my profile level: <strong className="text-slate-700">{CATEGORY_LABELS[selectedCategory]}</strong>
            </label>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 bg-slate-100 p-1.5 rounded-2xl mb-8 border border-slate-200/50 scrollbar-none">
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          const count = counts[t.key] || 0;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-smooth ${
                isActive 
                  ? 'bg-white text-brand-orange shadow-sm ring-1 ring-slate-200/55' 
                  : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <span>{t.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${isActive ? 'bg-orange-100 text-brand-orange' : 'bg-slate-200 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Listings */}
      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((item) => {
            const isSaved = isBookmarked(item.searchType, item.id);
            return (
              <div 
                key={item.searchType + '-' + item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:shadow-sm hover:border-slate-300 transition-smooth gap-4 group"
              >
                {/* Left side info */}
                <div className="flex gap-4.5 items-start">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${item.color}`}>
                    {item.icon}
                  </span>
                  
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        {item.searchLabel}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">•</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        📍 {item.location}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-brand-orange transition-smooth leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-500 text-xs line-clamp-1 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>

                {/* Right side actions */}
                <div className="flex gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end border-t border-slate-100 sm:border-t-0 pt-3 sm:pt-0">
                  <button 
                    onClick={() => handleBookmarkToggle(item.searchType, item)}
                    className={`p-2 rounded-xl border transition-smooth ${
                      isSaved 
                        ? 'border-brand-orange/20 bg-orange-50 text-brand-orange' 
                        : 'border-slate-200 text-slate-400 hover:text-brand-orange hover:bg-slate-50'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Save Item'}
                  >
                    {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                  </button>
                  
                  <button
                    onClick={() => handleShare(item.searchType, item)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-smooth"
                    title="Copy Share Link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>

                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-bold bg-brand-orange hover:bg-brand-orangeHover text-white px-4 py-2.5 rounded-xl shadow-sm transition-smooth"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
          <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">No Match Found</h3>
          <p className="text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find matches for &quot;{query}&quot;. Try editing the keyword search query or disabling the profile filter checkbox.
          </p>
        </div>
      )}
    </div>
  );
}
