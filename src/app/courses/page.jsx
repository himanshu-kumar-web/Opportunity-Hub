'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { courses, CATEGORY_LABELS } from '@/data/mockData';
import { 
  Search, SlidersHorizontal, Share2, Bookmark, 
  BookmarkCheck, ExternalLink, Clock, BookOpen, 
  IndianRupee, X, CheckCircle2, Award, BookOpenCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CoursesPage() {
  const { selectedCategory, toggleBookmark, isBookmarked } = useApp();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDomain, setFilterDomain] = useState('all'); // Coding vs Design vs Finance etc
  const [filterCost, setFilterCost] = useState('all'); // Free vs Paid
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

  const handleBookmarkToggle = (c) => {
    const isSaved = isBookmarked('course', c.id);
    toggleBookmark('course', c.id, c);
    if (!isSaved) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
      triggerToast(`Saved "${c.title}" course!`);
    } else {
      triggerToast(`Removed "${c.title}" from saved list.`);
    }
  };

  const handleShare = (c) => {
    const shareUrl = `${window.location.origin}/courses?id=${c.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => triggerToast('Course link copied!'))
      .catch((err) => console.error(err));
  };

  // Domains extractor
  const domains = Array.from(new Set(courses.map(c => c.domain)));

  // Filtering
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || c.categories.includes(filterCategory);
    const matchesDomain = filterDomain === 'all' || c.domain === filterDomain;
    
    let matchesCost = true;
    if (filterCost === 'free') {
      matchesCost = c.cost.toLowerCase().includes('free');
    } else if (filterCost === 'paid') {
      matchesCost = !c.cost.toLowerCase().includes('free') || c.cost.toLowerCase().includes('paid');
    }

    return matchesSearch && matchesCategory && matchesDomain && matchesCost;
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
          <h1 className="text-3xl font-extrabold text-brand-textNavy tracking-tight">Courses & Certifications</h1>
          <p className="text-sm text-slate-500 mt-1">Accelerate your skill sets with free academic Bootcamps and industry credentials.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search python, ux design, swayam..."
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
                onClick={() => { setFilterCategory('all'); setFilterDomain('all'); setFilterCost('all'); }}
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
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Domain</label>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="all">All Subjects</option>
                {domains.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Cost Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pricing model</label>
              <select
                value={filterCost}
                onChange={(e) => setFilterCost(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="all">All Options</option>
                <option value="free">Free Courses Only</option>
                <option value="paid">Paid Programs / Certs</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 mb-6">
          <span className="text-sm font-semibold text-slate-700">Found {filteredCourses.length} courses</span>
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
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCourses.map((c) => {
                const isSaved = isBookmarked('course', c.id);
                return (
                  <div 
                    key={c.id} 
                    className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-smooth relative group"
                  >
                    <div>
                      {/* Top Badges / Save */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${
                            c.cost.toLowerCase().includes('free') 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {c.cost.toLowerCase().includes('free') ? 'Free' : 'Premium'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold">
                            {c.domain}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => handleBookmarkToggle(c)}
                          className={`p-1.5 rounded-lg border transition-smooth ${
                            isSaved 
                              ? 'border-brand-orange/20 bg-orange-50 text-brand-orange' 
                              : 'border-slate-200 text-slate-400 hover:text-brand-orange hover:bg-slate-50'
                          }`}
                          title={isSaved ? 'Remove Bookmark' : 'Save Course'}
                        >
                          {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                        </button>
                      </div>

                      {/* Course Name */}
                      <h3 className="font-bold text-slate-800 text-base mt-4 line-clamp-2 leading-tight group-hover:text-brand-orange transition-smooth flex items-center gap-1.5">
                        <BookOpenCheck className="h-5 w-5 text-slate-400 shrink-0" />
                        <span>{c.title}</span>
                      </h3>

                      <p className="text-xs text-slate-400 font-semibold mt-1">
                        Provided by: <span className="text-slate-600">{c.provider}</span>
                      </p>

                      {/* Details list */}
                      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>Duration: <strong className="text-slate-700">{c.duration}</strong></span>
                        </div>
                        
                        <div className="flex items-start gap-2 text-xs text-slate-600">
                          <Award className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-500">Fees / Costs:</span>
                            <p className="mt-0.5 text-slate-700 font-semibold">{c.cost}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleShare(c)}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-smooth"
                        title="Copy Link"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <a 
                        href={c.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-bold bg-brand-orange hover:bg-brand-orangeHover text-white px-3.5 py-2 rounded-xl shadow-sm transition-smooth"
                      >
                        <span>Go to Course</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No Courses Found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                No educational courses match the criteria. Try widening your filters.
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
              <h3 className="font-extrabold text-slate-800 text-base">Filter Courses</h3>
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
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Domain</label>
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

            {/* Cost Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pricing Model</label>
              <select
                value={filterCost}
                onChange={(e) => setFilterCost(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Options</option>
                <option value="free">Free Courses Only</option>
                <option value="paid">Paid Programs / Certs</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => { setFilterCategory('all'); setFilterDomain('all'); setFilterCost('all'); }}
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
