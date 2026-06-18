'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORY_LABELS } from '@/data/mockData';
import { 
  GraduationCap, BookOpen, Landmark, Briefcase, 
  Trophy, BookOpenCheck, Bookmark, Trash2, ExternalLink, 
  User, CheckCircle2, Sliders, ChevronRight, Lock 
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { 
    selectedCategory, 
    setIsCategoryModalOpen, 
    bookmarks, 
    toggleBookmark, 
    user, 
    logout 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRemoveBookmark = (type, id, name) => {
    toggleBookmark(type, id, null);
    triggerToast(`Removed "${name}" from saved list.`);
  };

  // Group bookmarks by type
  const getFilteredBookmarks = () => {
    if (activeTab === 'all') return bookmarks;
    return bookmarks.filter(b => b.type === activeTab);
  };

  const currentBookmarks = getFilteredBookmarks();

  const tabIcons = {
    scholarship: <GraduationCap className="h-4 w-4" />,
    scheme: <BookOpen className="h-4 w-4" />,
    loan: <Landmark className="h-4 w-4" />,
    internship: <Briefcase className="h-4 w-4" />,
    competition: <Trophy className="h-4 w-4" />,
    course: <BookOpenCheck className="h-4 w-4" />
  };

  const counts = {
    all: bookmarks.length,
    scholarship: bookmarks.filter(b => b.type === 'scholarship').length,
    scheme: bookmarks.filter(b => b.type === 'scheme').length,
    loan: bookmarks.filter(b => b.type === 'loan').length,
    internship: bookmarks.filter(b => b.type === 'internship').length,
    competition: bookmarks.filter(b => b.type === 'competition').length,
    course: bookmarks.filter(b => b.type === 'course').length
  };

  const tabs = [
    { key: 'all', label: 'All Items' },
    { key: 'scholarship', label: 'Scholarships' },
    { key: 'scheme', label: 'Gov Schemes' },
    { key: 'loan', label: 'Loans' },
    { key: 'internship', label: 'Internships' },
    { key: 'competition', label: 'Hackathons' },
    { key: 'course', label: 'Courses' }
  ];

  const currentCategoryLabel = selectedCategory ? CATEGORY_LABELS[selectedCategory] : 'None Selected';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 transition-smooth animate-float-less text-sm">
          <CheckCircle2 className="h-4 w-4 text-brand-orange" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: User Profile Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-tr from-brand-blue to-brand-lightNavy text-white flex items-center justify-center font-bold text-xl shadow-md">
                {user ? user.name[0].toUpperCase() : <User className="h-7 w-7" />}
              </div>
              <h2 className="text-lg font-bold text-slate-800 mt-4">{user ? user.name : 'Guest Student'}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{user ? user.email : 'Local-only session'}</p>
            </div>

            {/* Profile Detail List */}
            <div className="py-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Education Level</span>
                <span className="text-sm font-semibold text-slate-700 mt-1 block">
                  {currentCategoryLabel}
                </span>
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="text-xs font-bold text-brand-orange hover:text-brand-orangeHover mt-1 underline transition-smooth"
                >
                  Edit Profile Category
                </button>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Auth Status</span>
                <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200">
                  {user ? 'Verified Account' : 'Guest Student'}
                </span>
              </div>
            </div>

            {/* Logout button */}
            {user && (
              <button 
                onClick={logout}
                className="w-full py-2.5 text-center text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-smooth"
              >
                Sign Out Account
              </button>
            )}
          </div>

          {/* Sync warning banner */}
          {!user && (
            <div className="bg-gradient-to-tr from-brand-blue to-slate-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
              <Lock className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5" />
              <h3 className="font-bold text-sm">Save your data!</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Currently, your saved items are stored on this browser only. Sign in to sync them across your mobile and computer.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Saved Items Catalog */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h1 className="text-2xl font-extrabold text-brand-textNavy tracking-tight">Saved Opportunities</h1>
            <p className="text-sm text-slate-500 mt-1">Review bookmarks, check application dates, and finalize submissions.</p>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-1 bg-slate-100 p-1 rounded-xl mt-6 mb-6 border border-slate-200/50 scrollbar-none">
              {tabs.map((t) => {
                const isActive = activeTab === t.key;
                const count = counts[t.key] || 0;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-smooth ${
                      isActive 
                        ? 'bg-white text-brand-orange shadow-sm' 
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

            {/* List */}
            {currentBookmarks.length > 0 ? (
              <div className="space-y-4">
                {currentBookmarks.map((bookmark) => {
                  const item = bookmark.data;
                  const itemTitle = item.name || item.title || item.bank_name || 'Opportunity';
                  const itemSubtitle = item.eligibility || item.benefit || item.cost || item.stipend || '';
                  const itemLink = item.link || '#';
                  
                  return (
                    <div 
                      key={bookmark.type + '-' + bookmark.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4.5 bg-slate-50 rounded-2xl border border-slate-150 hover:border-slate-350 transition-smooth gap-4 group"
                    >
                      <div className="flex gap-3.5 items-start">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-100 text-brand-orange">
                          {tabIcons[bookmark.type]}
                        </span>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            {bookmark.type}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm line-clamp-1 leading-snug group-hover:text-brand-orange transition-smooth">
                            {itemTitle}
                          </h4>
                          <p className="text-slate-500 text-xs line-clamp-1 mt-0.5">
                            {itemSubtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleRemoveBookmark(bookmark.type, bookmark.id, itemTitle)}
                          className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 transition-smooth"
                          title="Remove bookmark"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <a
                          href={itemLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 rounded-lg transition-smooth shadow-sm"
                        >
                          <span>Portal</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl p-6">
                <Bookmark className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-700">No Saved Items Found</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Click the bookmark icon on any opportunity card in the directory pages to save items here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
