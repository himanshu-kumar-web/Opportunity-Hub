'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORY_LABELS, CATEGORY_GROUPS } from '@/data/mockData';
import { X, Check, BookOpen, GraduationCap, Award, Compass } from 'lucide-react';

export default function CategorySelection() {
  const { 
    selectedCategory, 
    selectCategory, 
    isCategoryModalOpen, 
    setIsCategoryModalOpen 
  } = useApp();

  const [activeTab, setActiveTab] = useState('School');

  if (!isCategoryModalOpen) return null;

  const tabIcons = {
    'School': <BookOpen className="h-4.5 w-4.5" />,
    'After 12th / UG': <GraduationCap className="h-4.5 w-4.5" />,
    'Postgraduate': <Award className="h-4.5 w-4.5" />,
    'Diploma / Vocational': <Compass className="h-4.5 w-4.5" />
  };

  const handleSelect = (key) => {
    selectCategory(key);
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] transition-smooth">
        {/* Header */}
        <div className="p-6 bg-gradient-to-tr from-brand-blue to-brand-lightNavy text-white flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">Select Your Education Level</h2>
            <p className="text-xs text-white/70 mt-1">We will customize scholarships, internships, courses, and career paths for your specific level.</p>
          </div>
          <button 
            onClick={() => setIsCategoryModalOpen(false)}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-smooth"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50 p-2 gap-1 scrollbar-none">
          {Object.keys(CATEGORY_GROUPS).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-smooth ${
                  isActive 
                    ? 'bg-white text-brand-orange shadow-sm ring-1 ring-slate-200/50' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tabIcons[tab]}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategories list */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CATEGORY_GROUPS[activeTab].map((key) => {
              const label = CATEGORY_LABELS[key];
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-smooth group ${
                    isSelected 
                      ? 'border-brand-orange bg-orange-50/50 text-brand-orange ring-1 ring-brand-orange' 
                      : 'border-slate-200 hover:border-brand-orange hover:bg-slate-50/30'
                  }`}
                >
                  <span className={`text-sm font-semibold ${isSelected ? 'text-brand-orange' : 'text-slate-700 group-hover:text-brand-orange'}`}>
                    {label}
                  </span>
                  
                  {isSelected ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span className="h-5 w-5 rounded-full border border-slate-200 group-hover:border-brand-orange transition-smooth" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Current selection: <strong>{selectedCategory ? CATEGORY_LABELS[selectedCategory] : 'None'}</strong></span>
          <button 
            onClick={() => setIsCategoryModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-sm transition-smooth"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
