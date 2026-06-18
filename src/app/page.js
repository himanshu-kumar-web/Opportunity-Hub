'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CATEGORY_LABELS } from '@/data/mockData';
import { 
  scholarships, schemes, loans, internships, 
  competitions, courses, careerPaths 
} from '@/data/mockData';
import { 
  GraduationCap, BookOpen, Landmark, Briefcase, 
  Trophy, BookOpenCheck, LineChart, Search, Sparkles, 
  ArrowRight, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function Home() {
  const { selectedCategory, setIsCategoryModalOpen } = useApp();

  // Helper to count matches based on selected category
  const getCounts = () => {
    if (!selectedCategory) {
      return {
        scholarships: scholarships.length,
        schemes: schemes.length,
        loans: loans.length,
        internships: internships.length,
        competitions: competitions.length,
        courses: courses.length,
        careers: careerPaths.length
      };
    }

    return {
      scholarships: scholarships.filter(s => s.categories.includes(selectedCategory)).length,
      schemes: schemes.filter(s => s.categories.includes(selectedCategory)).length,
      loans: loans.filter(l => l.categories.includes(selectedCategory)).length,
      internships: internships.filter(i => i.categories.includes(selectedCategory)).length,
      competitions: competitions.filter(c => c.categories.includes(selectedCategory)).length,
      courses: courses.filter(c => c.categories.includes(selectedCategory)).length,
      careers: careerPaths.filter(cp => cp.stream === getStreamFromCategory(selectedCategory)).length
    };
  };

  const getStreamFromCategory = (cat) => {
    if (cat.includes('science') || cat === 'btech-be' || cat === 'mbbs-bds' || cat === 'bsc' || cat === 'mtech-me' || cat === 'msc' || cat === 'md-ms') {
      return 'Science';
    }
    if (cat.includes('commerce') || cat === 'bcom' || cat === 'bba-bms' || cat === 'mba') {
      return 'Commerce';
    }
    if (cat.includes('arts') || cat === 'ba' || cat === 'ma' || cat === 'law-llb') {
      return 'Arts';
    }
    if (cat === 'design') {
      return 'Arts';
    }
    if (cat === 'iti' || cat === 'polytechnic-diploma' || cat === 'skills-certificate' || cat === 'diploma-polytechnic') {
      return 'Vocational';
    }
    return 'Science';
  };

  const counts = getCounts();

  const sections = [
    {
      title: 'Scholarships',
      desc: 'Discover central, state government schemes and private NGO funding opportunities tailored to your needs.',
      count: counts.scholarships,
      href: '/scholarships',
      icon: <GraduationCap className="h-6 w-6 text-brand-orange" />,
      color: 'from-orange-500/10 to-amber-500/10 border-orange-200'
    },
    {
      title: 'Government Schemes',
      desc: 'Explore central and state schemes offering direct benefits, fee waivers, and academic subsidies.',
      count: counts.schemes,
      href: '/schemes',
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-200'
    },
    {
      title: 'Education Loans',
      desc: 'Compare low-interest bank loans, collateral-free options, and government loan interest subsidies.',
      count: counts.loans,
      href: '/loans',
      icon: <Landmark className="h-6 w-6 text-emerald-500" />,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200'
    },
    {
      title: 'Internships',
      desc: 'Find remote or on-site stipended roles in Tech, Design, Law, Medical, and Finance to build real experience.',
      count: counts.internships,
      href: '/internships',
      icon: <Briefcase className="h-6 w-6 text-purple-500" />,
      color: 'from-purple-500/10 to-pink-500/10 border-purple-200'
    },
    {
      title: 'Competitions & Hackathons',
      desc: 'Compete in quizzes, olympiads, national hackathons, and case study competitions for career growth and prizes.',
      count: counts.competitions,
      href: '/competitions',
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      color: 'from-yellow-500/10 to-amber-500/10 border-yellow-200'
    },
    {
      title: 'Courses & Certifications',
      desc: 'Access free and high-value certified courses from SWAYAM, Coursera, Google, and FreeCodeCamp.',
      count: counts.courses,
      href: '/courses',
      icon: <BookOpenCheck className="h-6 w-6 text-sky-500" />,
      color: 'from-sky-500/10 to-cyan-500/10 border-sky-200'
    },
    {
      title: 'Career Paths & Scope',
      desc: 'See salaries, recruiting companies, entrance exams, and 2030 future scope for different streams.',
      count: counts.careers,
      href: '/careers',
      icon: <LineChart className="h-6 w-6 text-rose-500" />,
      color: 'from-rose-500/10 to-red-500/10 border-rose-200'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue to-slate-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent_50%)]" />
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-semibold text-brand-orange mb-6 border border-brand-orange/20 animate-pulse-soft">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Empowering Student Careers & Education</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Your Next Big <br />
            <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
              Academic Opportunity
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A centralized hub for students to find scholarships, government assistance, training programs, remote internships, and detailed career roadmaps.
          </p>

          {/* CTA Selector / Status */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {selectedCategory ? (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-2xl border border-white/20 shadow-md backdrop-blur-md">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange" />
                  <span className="text-sm">
                    Tailored for: <strong className="text-white font-semibold">{CATEGORY_LABELS[selectedCategory]}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="text-xs text-brand-orange hover:text-brand-orangeHover hover:underline font-bold transition-smooth"
                >
                  Change category to see other opportunities
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="group flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-brand-orange/20 transition-smooth text-base"
              >
                <span>Select Your Category</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </button>
            )}

            <Link
              href="/search"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 px-6 py-4 rounded-2xl font-semibold transition-smooth text-sm"
            >
              <Search className="h-4.5 w-4.5" />
              <span>Search Globally</span>
            </Link>
          </div>

          {/* Stat Counters */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/10 pt-12">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-orange">₹50L+</p>
              <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Total Aid Value</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">500+</p>
              <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Opportunities</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white">100%</p>
              <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Verified Links</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-orange">24/7</p>
              <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Student Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Dashboard Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-textNavy tracking-tight">
                Opportunity Dashboard
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                {selectedCategory 
                  ? `Showing matches matching your profile: ${CATEGORY_LABELS[selectedCategory]}`
                  : 'Select your level above to unlock personalized student benefits.'}
              </p>
            </div>

            {!selectedCategory && (
              <button 
                onClick={() => setIsCategoryModalOpen(true)}
                className="text-xs font-bold bg-orange-50 hover:bg-orange-100 text-brand-orange border border-brand-orange/20 px-4 py-2 rounded-xl transition-smooth w-fit"
              >
                Personalize Matches
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((sec, idx) => (
              <div 
                key={sec.title} 
                className={`relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-gradient-to-br ${sec.color} hover:shadow-lg hover:border-slate-300 transition-smooth group`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                      {sec.icon}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-150">
                      {selectedCategory ? `${sec.count} Matches` : `${sec.count} Total`}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-brand-textNavy mt-5 group-hover:text-brand-orange transition-smooth">
                    {sec.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/40">
                  <Link 
                    href={sec.href}
                    className="flex items-center justify-between text-xs font-bold text-brand-textNavy group-hover:text-brand-orange transition-smooth"
                  >
                    <span>Explore Section</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Guide Banner */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-brand-blue to-brand-navy rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.15),transparent_50%)]" />
          <div className="max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Need help applying?</h2>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Read our curated guides on how to write a winning Statement of Purpose (SOP), preparing for technical interviews, and applying for government NSP funding.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/blog"
                className="bg-brand-orange hover:bg-brand-orangeHover text-white px-5 py-3 rounded-xl font-bold shadow-md transition-smooth text-xs"
              >
                Read Tips & Guides
              </Link>
              <Link 
                href="/submit"
                className="bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-semibold transition-smooth text-xs"
              >
                Submit a New Opportunity
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
