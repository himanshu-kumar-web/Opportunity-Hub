'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { careerPaths } from '@/data/mockData';
import { 
  Search, LineChart, Award, ShieldAlert, Sparkles,
  Building, GraduationCap, ArrowRight, UserCheck, 
  MapPin, ClipboardList, IndianRupee, BrainCircuit 
} from 'lucide-react';

export default function CareerPathsPage() {
  const { selectedCategory } = useApp();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStream, setFilterStream] = useState('all');

  // Pre-select stream based on student category
  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory.includes('science') || ['btech-be', 'mbbs-bds', 'bsc', 'mtech-me', 'msc', 'md-ms'].includes(selectedCategory)) {
        setFilterStream('Science');
      } else if (selectedCategory.includes('commerce') || ['bcom', 'bba-bms', 'mba'].includes(selectedCategory)) {
        setFilterStream('Commerce');
      } else if (selectedCategory.includes('arts') || ['ba', 'ma', 'law-llb', 'design'].includes(selectedCategory)) {
        setFilterStream('Arts');
      } else if (['iti', 'polytechnic-diploma', 'skills-certificate', 'diploma-polytechnic'].includes(selectedCategory)) {
        setFilterStream('Vocational');
      }
    }
  }, [selectedCategory]);

  const streams = ['Science', 'Commerce', 'Arts', 'Vocational'];

  // Filtering
  const filteredCareers = careerPaths.filter(cp => {
    const matchesSearch = cp.career_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cp.future_scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cp.entrance_exams.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStream = filterStream === 'all' || cp.stream === filterStream;

    return matchesSearch && matchesStream;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-textNavy tracking-tight">Career Paths & Future Scope</h1>
          <p className="text-sm text-slate-500 mt-1">Explore job markets, required entrance exams, expected salaries, and AI impact on fields.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search careers, exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth bg-white"
          />
        </div>
      </div>

      {/* Stream Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-slate-100 scrollbar-none">
        <button
          onClick={() => setFilterStream('all')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-smooth ${
            filterStream === 'all' 
              ? 'bg-brand-orange text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Streams
        </button>
        {streams.map((stream) => (
          <button
            key={stream}
            onClick={() => setFilterStream(stream)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-smooth ${
              filterStream === stream 
                ? 'bg-brand-orange text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {stream}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {filteredCareers.length > 0 ? (
        <div className="space-y-8">
          {filteredCareers.map((cp) => {
            const roadmapSteps = cp.path.split(' → ');
            return (
              <div 
                key={cp.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 hover:shadow-md transition-smooth relative overflow-hidden group"
              >
                {/* Accent glow on card hover */}
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange group-hover:h-full transition-all" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Summary */}
                  <div className="lg:col-span-1 space-y-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">
                      {cp.stream} Stream
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-brand-textNavy leading-tight">
                      {cp.career_name}
                    </h2>
                    
                    {/* Salary info */}
                    <div className="flex items-center gap-2 text-brand-orange bg-orange-50 border border-brand-orange/15 p-4 rounded-2xl w-fit">
                      <IndianRupee className="h-6 w-6 font-bold" />
                      <div>
                        <span className="text-[10px] text-brand-orange/80 font-bold uppercase tracking-wider block">Average Salary Range</span>
                        <span className="text-base font-extrabold">{cp.salary_range}</span>
                      </div>
                    </div>

                    {/* Recruiting Companies */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Top Recruiting Companies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cp.top_companies.map(company => (
                          <span key={company} className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600">
                            <Building className="h-3 w-3 text-slate-400" />
                            <span>{company}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Roadmap Timeline */}
                  <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-x border-slate-100 lg:px-8 py-6 lg:py-0 space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                      <GraduationCap className="h-4.5 w-4.5 text-slate-400" />
                      <span>Academic Roadmap</span>
                    </span>

                    {/* Timeline Steps */}
                    <div className="relative border-l border-slate-200 ml-3.5 space-y-6 py-2">
                      {roadmapSteps.map((step, index) => {
                        const isLast = index === roadmapSteps.length - 1;
                        return (
                          <div key={index} className="relative pl-6">
                            {/* Circle Pin */}
                            <span className={`absolute -left-[9px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 bg-white ${
                              isLast 
                                ? 'border-brand-orange ring-4 ring-orange-50' 
                                : 'border-slate-300'
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${isLast ? 'bg-brand-orange' : 'bg-slate-300'}`} />
                            </span>
                            
                            <p className={`text-xs font-bold ${isLast ? 'text-brand-orange' : 'text-slate-700'}`}>
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Exams & AI Scope */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Entrance Exams */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                        <ClipboardList className="h-4.5 w-4.5 text-slate-400" />
                        <span>Key Entrance Exams</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cp.entrance_exams.map(exam => (
                          <span key={exam} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200">
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Future Scope / AI impact */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-brand-orange font-bold text-xs uppercase tracking-wider">
                        <BrainCircuit className="h-4.5 w-4.5" />
                        <span>2030 Market & AI Scope</span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {cp.future_scope}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <LineChart className="h-10 w-10 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">No Career Guides Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            No roadmaps match the search terms. Clear query to explore careers.
          </p>
        </div>
      )}
    </div>
  );
}
