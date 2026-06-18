'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { internships, CATEGORY_LABELS } from '@/data/mockData';
import { 
  Search, SlidersHorizontal, Share2, Bookmark, 
  BookmarkCheck, ExternalLink, Calendar, Info, 
  IndianRupee, X, CheckCircle2, Briefcase, MapPin, 
  Hourglass, CheckCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InternshipsPage() {
  const { selectedCategory, toggleBookmark, isBookmarked } = useApp();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDomain, setFilterDomain] = useState('all'); // Tech vs Law vs Design vs Medical etc
  const [filterMode, setFilterMode] = useState('all'); // Remote vs On-site
  const [filterStipend, setFilterStipend] = useState('all'); // Paid vs All
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setFilterCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBookmarkToggle = (i) => {
    const isSaved = isBookmarked('internship', i.id);
    toggleBookmark('internship', i.id, i);
    if (!isSaved) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
      triggerToast(`Saved ${i.company} internship opportunity!`);
    } else {
      triggerToast(`Removed ${i.company} internship.`);
    }
  };

  const handleShare = (i) => {
    const shareUrl = `${window.location.origin}/internships?id=${i.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => triggerToast('Internship link copied!'))
      .catch((err) => console.error(err));
  };

  // Calculate days remaining
  const getDaysLeftText = (deadlineStr) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    today.setHours(0,0,0,0);
    deadline.setHours(0,0,0,0);

    const diff = deadline.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return { text: 'Closed', color: 'bg-red-100 text-red-700 border-red-200' };
    if (days === 0) return { text: 'Closes today', color: 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse' };
    if (days === 1) return { text: 'Last day', color: 'bg-orange-100 text-orange-700 border-orange-200 font-bold' };
    if (days <= 7) return { text: `${days} days left`, color: 'bg-amber-100 text-amber-700 border-amber-200 font-semibold' };
    return { text: `${days} days left`, color: 'bg-slate-100 text-slate-600 border-slate-200' };
  };

  // Domains extractor
  const domains = Array.from(new Set(internships.map(i => i.domain)));

  // Filtering
  const filteredInternships = internships.filter(i => {
    const matchesSearch = i.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          i.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || i.categories.includes(filterCategory);
    const matchesDomain = filterDomain === 'all' || i.domain === filterDomain;
    
    let matchesMode = true;
    if (filterMode === 'remote') {
      matchesMode = i.mode.toLowerCase().includes('remote');
    } else if (filterMode === 'onsite') {
      matchesMode = i.mode.toLowerCase().includes('site');
    }

    const matchesStipend = filterStipend === 'all' || i.stipend > 0;

    return matchesSearch && matchesCategory && matchesDomain && matchesMode && matchesStipend;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 transition-smooth animate-float-less text-sm">
          <CheckCircle2 className="h-4 w-4 text-brand-orange" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-textNavy tracking-tight">Internship Board</h1>
          <p className="text-sm text-slate-500 mt-1">Acquire practical experience with top corporate listings, filtered by your stream.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search company, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-white"
          />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                <SlidersHorizontal className="h-4 w-4 text-brand-orange" />
                <span>Filters</span>
              </h3>
              <button 
                onClick={() => { setFilterCategory('all'); setFilterDomain('all'); setFilterMode('all'); setFilterStipend('all'); }}
                className="text-[11px] font-bold text-brand-orange hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Education Level</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="all">All Levels</option>
                {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>

            {/* Domain Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Career Domain</label>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="all">All Domains</option>
                {domains.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Working Mode</label>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="all">All Modes</option>
                <option value="remote">Remote Roles Only</option>
                <option value="onsite">On-site / Hybrid</option>
              </select>
            </div>

            {/* Stipend Filter */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="stipendFilter"
                checked={filterStipend === 'paid'}
                onChange={(e) => setFilterStipend(e.target.checked ? 'paid' : 'all')}
                className="h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
              />
              <label htmlFor="stipendFilter" className="text-xs font-bold text-slate-600 cursor-pointer">
                Stipended Internships Only
              </label>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 mb-6">
          <span className="text-sm font-semibold text-slate-700">Found {filteredInternships.length} internships</span>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-orange border border-brand-orange/20 bg-orange-50 px-3.5 py-2 rounded-lg"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filter List</span>
          </button>
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3 space-y-6">
          {filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredInternships.map((i) => {
                const isSaved = isBookmarked('internship', i.id);
                const deadlineInfo = getDaysLeftText(i.deadline);
                return (
                  <div 
                    key={i.id} 
                    className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-smooth relative group"
                  >
                    <div>
                      {/* Top Badges / Save */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${deadlineInfo.color}`}>
                            {deadlineInfo.text}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold">
                            {i.domain}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => handleBookmarkToggle(i)}
                          className={`p-1.5 rounded-lg border transition-smooth ${
                            isSaved 
                              ? 'border-brand-orange/20 bg-orange-50 text-brand-orange' 
                              : 'border-slate-200 text-slate-400 hover:text-brand-orange hover:bg-slate-50'
                          }`}
                          title={isSaved ? 'Remove Bookmark' : 'Save Internship'}
                        >
                          {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                        </button>
                      </div>

                      {/* Job Title / Company */}
                      <h3 className="font-bold text-slate-800 text-base mt-4 line-clamp-1 leading-tight group-hover:text-brand-orange transition-smooth">
                        {i.domain} Intern
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-slate-300" />
                        <span>{i.company}</span>
                      </p>

                      {/* Stipend Details */}
                      <div className="flex items-center gap-1.5 mt-4 text-brand-orange">
                        {i.stipend > 0 ? (
                          <>
                            <IndianRupee className="h-4.5 w-4.5 font-bold" />
                            <span className="text-lg font-extrabold tracking-tight">
                              {i.stipend.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">/ month stipend</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-lg">Unpaid / Pro-bono</span>
                        )}
                      </div>

                      {/* Details list */}
                      <div className="mt-5 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>Mode: <strong className="text-slate-700">{i.mode}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Hourglass className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>Duration: <strong className="text-slate-700">{i.duration}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleShare(i)}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-smooth"
                        title="Copy Link"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <a 
                        href={i.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-bold bg-brand-orange hover:bg-brand-orangeHover text-white px-3.5 py-2 rounded-xl shadow-sm transition-smooth"
                      >
                        <span>Apply Portal</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No Internships Found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                No active internships fit those criteria. Try loosening your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full bg-white rounded-t-3xl shadow-xl overflow-hidden p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-800 text-base">Filter Internships</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-1 text-slate-500 hover:bg-slate-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Education Level</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Levels</option>
                {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>

            {/* Domain Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Domain</label>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Domains</option>
                {domains.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Working Mode</label>
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Modes</option>
                <option value="remote">Remote Roles Only</option>
                <option value="onsite">On-site / Hybrid</option>
              </select>
            </div>

            {/* Stipend Filter */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="stipendFilterMobile"
                checked={filterStipend === 'paid'}
                onChange={(e) => setFilterStipend(e.target.checked ? 'paid' : 'all')}
                className="h-4 w-4 rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
              />
              <label htmlFor="stipendFilterMobile" className="text-xs font-bold text-slate-600 cursor-pointer">
                Stipended Internships Only
              </label>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => { setFilterCategory('all'); setFilterDomain('all'); setFilterMode('all'); setFilterStipend('all'); }}
                className="flex-1 py-3 text-center border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 py-3 text-center bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-sm font-bold shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
