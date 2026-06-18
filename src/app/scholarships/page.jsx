'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { scholarships, CATEGORY_LABELS } from '@/data/mockData';
import { 
  Search, SlidersHorizontal, Share2, Bookmark, 
  BookmarkCheck, ExternalLink, Calendar, Info, 
  IndianRupee, X, Check, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScholarshipsPage() {
  const { selectedCategory, toggleBookmark, isBookmarked } = useApp();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all'); // Government vs Private
  const [filterCriteria, setFilterCriteria] = useState('all'); // Merit vs Need vs Minority
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Set default category filter based on user profile
  useEffect(() => {
    if (selectedCategory) {
      setFilterCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Toast notifier
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Bookmark handler with confetti
  const handleBookmarkToggle = (s) => {
    const isSaved = isBookmarked('scholarship', s.id);
    toggleBookmark('scholarship', s.id, s);
    
    if (!isSaved) {
      // Trigger confetti from the center of screen
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
      triggerToast(`Saved "${s.name}" to dashboard!`);
    } else {
      triggerToast(`Removed "${s.name}" from saved list.`);
    }
  };

  // Share handler
  const handleShare = (s) => {
    const shareUrl = `${window.location.origin}/scholarships?id=${s.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        triggerToast('Apply link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy', err);
      });
  };

  // Calculate days remaining
  const getDaysLeftText = (deadlineStr) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    today.setHours(0,0,0,0);
    deadline.setHours(0,0,0,0);

    const diff = deadline.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return { text: 'Expired', color: 'bg-red-100 text-red-700 border-red-200' };
    if (days === 0) return { text: 'Ends today', color: 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse' };
    if (days === 1) return { text: '1 day left', color: 'bg-orange-100 text-orange-700 border-orange-200 font-bold' };
    if (days <= 7) return { text: `${days} days left`, color: 'bg-amber-100 text-amber-700 border-amber-200 font-semibold' };
    return { text: `${days} days left`, color: 'bg-slate-100 text-slate-600 border-slate-200' };
  };

  // Filter logic
  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.eligibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.state.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || s.categories.includes(filterCategory);
    const matchesType = filterType === 'all' || s.type === filterType;
    const matchesCriteria = filterCriteria === 'all' || s.criteria === filterCriteria;

    return matchesSearch && matchesCategory && matchesType && matchesCriteria;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 transition-smooth animate-float-less text-sm">
          <CheckCircle2 className="h-4 w-4 text-brand-orange" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-textNavy tracking-tight">Scholarship Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Discover verified government and private scholarships for students.</p>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, eligibility, state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-white"
          />
        </div>
      </div>

      {/* Layout Grid */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                <SlidersHorizontal className="h-4 w-4 text-brand-orange" />
                <span>Filters</span>
              </h3>
              <button 
                onClick={() => { setFilterCategory('all'); setFilterType('all'); setFilterCriteria('all'); }}
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
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/40 text-slate-700"
              >
                <option value="all">All Levels / General</option>
                {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>

            {/* Funding Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Funding Provider</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/40 text-slate-700"
              >
                <option value="all">All Types</option>
                <option value="Government">Government Only</option>
                <option value="Private/NGO">Private / NGO Only</option>
              </select>
            </div>

            {/* Criteria Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Criteria</label>
              <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/40 text-slate-700"
              >
                <option value="all">All Criteria</option>
                <option value="Merit-based">Merit-based Only</option>
                <option value="Need-based">Need-based Only</option>
                <option value="Minority">SC / ST / OBC / Minority</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 mb-6">
          <span className="text-sm font-semibold text-slate-700">Found {filteredScholarships.length} scholarships</span>
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
          {filteredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredScholarships.map((s) => {
                const isSaved = isBookmarked('scholarship', s.id);
                const deadlineInfo = getDaysLeftText(s.deadline);
                return (
                  <div 
                    key={s.id} 
                    className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:shadow-md hover:border-slate-300 transition-smooth relative group"
                  >
                    <div>
                      {/* Top Badges / Save */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${deadlineInfo.color}`}>
                            {deadlineInfo.text}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold">
                            {s.type}
                          </span>
                          {s.is_verified && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold flex items-center gap-0.5">
                              <Check className="h-2.5 w-2.5" /> Verified
                            </span>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => handleBookmarkToggle(s)}
                          className={`p-1.5 rounded-lg border transition-smooth ${
                            isSaved 
                              ? 'border-brand-orange/20 bg-orange-50 text-brand-orange' 
                              : 'border-slate-200 text-slate-400 hover:text-brand-orange hover:bg-slate-50'
                          }`}
                          title={isSaved ? 'Remove Bookmark' : 'Save Scholarship'}
                        >
                          {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                        </button>
                      </div>

                      {/* Name & Amount */}
                      <h3 className="font-bold text-slate-800 text-base mt-4 line-clamp-2 leading-tight group-hover:text-brand-orange transition-smooth">
                        {s.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-3 text-brand-orange">
                        <IndianRupee className="h-4.5 w-4.5 font-bold" />
                        <span className="text-lg font-extrabold tracking-tight">
                          {s.amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">total aid</span>
                      </div>

                      {/* Eligibility block */}
                      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                        <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <p>{s.eligibility}</p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <span className="text-[11px] font-semibold text-slate-400 max-w-[120px] truncate">
                        📍 {s.state}
                      </span>
                      
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleShare(s)}
                          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-smooth"
                          title="Copy Link"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <a 
                          href={s.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-bold bg-brand-orange hover:bg-brand-orangeHover text-white px-3.5 py-2 rounded-xl shadow-sm transition-smooth"
                        >
                          <span>Apply</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <Search className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No Scholarships Found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                Try widening your filters, clearing the search query, or checking other education categories.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setFilterCategory('all'); setFilterType('all'); setFilterCriteria('all'); }}
                className="mt-5 text-xs font-bold bg-brand-orange hover:bg-brand-orangeHover text-white px-4 py-2 rounded-xl shadow transition-smooth"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full bg-white rounded-t-3xl shadow-xl overflow-hidden p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-800 text-base">Filter Opportunities</h3>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-1 text-slate-500 hover:bg-slate-100 rounded-full"
              >
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
                <option value="all">All Levels / General</option>
                {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>

            {/* Funding Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Funding Provider</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="Government">Government Only</option>
                <option value="Private/NGO">Private / NGO Only</option>
              </select>
            </div>

            {/* Criteria Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Criteria</label>
              <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Criteria</option>
                <option value="Merit-based">Merit-based Only</option>
                <option value="Need-based">Need-based Only</option>
                <option value="Minority">SC / ST / OBC / Minority</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => { setFilterCategory('all'); setFilterType('all'); setFilterCriteria('all'); }}
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
