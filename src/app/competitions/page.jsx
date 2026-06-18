'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { competitions, CATEGORY_LABELS } from '@/data/mockData';
import { 
  Search, SlidersHorizontal, Share2, Bookmark, 
  BookmarkCheck, ExternalLink, Calendar, Info, 
  IndianRupee, X, CheckCircle2, Trophy, Award, Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CompetitionsPage() {
  const { selectedCategory, toggleBookmark, isBookmarked } = useApp();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all'); // Hackathon vs Quiz vs Olympiad vs Case Study
  const [filterPrize, setFilterPrize] = useState('all'); // > 50k, > 1L etc
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
    const isSaved = isBookmarked('competition', c.id);
    toggleBookmark('competition', c.id, c);
    if (!isSaved) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
      triggerToast(`Saved "${c.name}" competition!`);
    } else {
      triggerToast(`Removed "${c.name}" from saved list.`);
    }
  };

  const handleShare = (c) => {
    const shareUrl = `${window.location.origin}/competitions?id=${c.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => triggerToast('Competition link copied!'))
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
    if (days === 0) return { text: 'Ends today', color: 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse' };
    if (days === 1) return { text: '1 day left', color: 'bg-orange-100 text-orange-700 border-orange-200 font-bold' };
    if (days <= 7) return { text: `${days} days left`, color: 'bg-amber-100 text-amber-700 border-amber-200 font-semibold' };
    return { text: `${days} days left`, color: 'bg-slate-100 text-slate-600 border-slate-200' };
  };

  // Filtering
  const filteredCompetitions = competitions.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || c.categories.includes(filterCategory);
    const matchesType = filterType === 'all' || c.type === filterType;
    
    let matchesPrize = true;
    if (filterPrize === '50k') {
      matchesPrize = c.prize >= 50000;
    } else if (filterPrize === '1L') {
      matchesPrize = c.prize >= 100000;
    } else if (filterPrize === '5L') {
      matchesPrize = c.prize >= 500000;
    }

    return matchesSearch && matchesCategory && matchesType && matchesPrize;
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
          <h1 className="text-3xl font-extrabold text-brand-textNavy tracking-tight">Competitions & Hackathons</h1>
          <p className="text-sm text-slate-500 mt-1">Compete nationally and internationally in technology challenges, hackathons, and case study pitches.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search hackathons, contests..."
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
                onClick={() => { setFilterCategory('all'); setFilterType('all'); setFilterPrize('all'); }}
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

            {/* Competition Type */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contest Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="all">All Types</option>
                <option value="Hackathon">Hackathons</option>
                <option value="Quiz">Quizzes</option>
                <option value="Olympiad">Olympiads</option>
                <option value="Case Study">Case Studies / B-Plan</option>
              </select>
            </div>

            {/* Prize Pool Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Minimum Prize Pool</label>
              <select
                value={filterPrize}
                onChange={(e) => setFilterPrize(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
              >
                <option value="all">Any Amount</option>
                <option value="50k">Over ₹50,000</option>
                <option value="1L">Over ₹1,00,000</option>
                <option value="5L">Over ₹5,00,000</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 mb-6">
          <span className="text-sm font-semibold text-slate-700">Found {filteredCompetitions.length} contests</span>
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
          {filteredCompetitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCompetitions.map((c) => {
                const isSaved = isBookmarked('competition', c.id);
                const deadlineInfo = getDaysLeftText(c.deadline);
                return (
                  <div 
                    key={c.id} 
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
                            {c.type}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => handleBookmarkToggle(c)}
                          className={`p-1.5 rounded-lg border transition-smooth ${
                            isSaved 
                              ? 'border-brand-orange/20 bg-orange-50 text-brand-orange' 
                              : 'border-slate-200 text-slate-400 hover:text-brand-orange hover:bg-slate-50'
                          }`}
                          title={isSaved ? 'Remove Bookmark' : 'Save Competition'}
                        >
                          {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                        </button>
                      </div>

                      {/* Contest Name */}
                      <h3 className="font-bold text-slate-800 text-base mt-4 line-clamp-2 leading-tight group-hover:text-brand-orange transition-smooth flex items-center gap-1.5">
                        <Trophy className="h-5 w-5 text-brand-orange shrink-0" />
                        <span>{c.name}</span>
                      </h3>

                      {/* Prizes display */}
                      <div className="flex items-center gap-1.5 mt-4 text-brand-orange">
                        <IndianRupee className="h-4.5 w-4.5 font-bold" />
                        <span className="text-lg font-extrabold tracking-tight">
                          {c.prize.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">worth prizes / rewards</span>
                      </div>

                      {/* Eligibility block */}
                      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                        <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-slate-500 mb-0.5">Eligibility:</span>
                          <p>{c.eligibility}</p>
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
                        <span>Register Now</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <Zap className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No Competitions Found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find hackathons or competitions matching those criteria. Try tweaking your filters.
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
              <h3 className="font-extrabold text-slate-800 text-base">Filter Contests</h3>
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

            {/* Competition Type */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contest Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="Hackathon">Hackathons</option>
                <option value="Quiz">Quizzes</option>
                <option value="Olympiad">Olympiads</option>
                <option value="Case Study">Case Studies / B-Plan</option>
              </select>
            </div>

            {/* Prize Pool Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Minimum Prize Pool</label>
              <select
                value={filterPrize}
                onChange={(e) => setFilterPrize(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">Any Amount</option>
                <option value="50k">Over ₹50,000</option>
                <option value="1L">Over ₹1,00,000</option>
                <option value="5L">Over ₹5,00,050</option>
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => { setFilterCategory('all'); setFilterType('all'); setFilterPrize('all'); }}
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
