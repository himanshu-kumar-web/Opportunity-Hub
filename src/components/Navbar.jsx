'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CATEGORY_LABELS } from '@/data/mockData';
import { 
  Menu, X, Bookmarks, Search, GraduationCap, 
  Sparkles, PlusCircle, User, LogOut, ChevronDown 
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  
  const pathname = usePathname();
  const { 
    selectedCategory, 
    setIsCategoryModalOpen, 
    bookmarks, 
    user, 
    mockLogin, 
    logout 
  } = useApp();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail && loginName) {
      mockLogin(loginEmail, loginName);
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginName('');
    }
  };

  const navLinks = [
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Schemes', href: '/schemes' },
    { name: 'Loans', href: '/loans' },
    { name: 'Internships', href: '/internships' },
    { name: 'Competitions', href: '/competitions' },
    { name: 'Courses', href: '/courses' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ];

  const currentCategoryLabel = selectedCategory ? CATEGORY_LABELS[selectedCategory] : 'None Selected';

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-smooth">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-blue to-brand-orange text-white shadow-md">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold tracking-tight text-brand-textNavy">
                Opportunity<span className="text-brand-orange">Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-smooth hover:text-brand-orange ${
                    isActive 
                      ? 'text-brand-orange border-b-2 border-brand-orange py-1' 
                      : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Category Indicator */}
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 py-1 px-3 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Category:</span>
              <span className="max-w-[120px] truncate text-xs font-semibold text-brand-textNavy" title={currentCategoryLabel}>
                {currentCategoryLabel}
              </span>
              <button 
                onClick={() => setIsCategoryModalOpen(true)}
                className="text-[10px] font-bold text-brand-orange hover:text-brand-orangeHover ml-1 underline transition-smooth"
              >
                Change
              </button>
            </div>

            {/* Global Search */}
            <Link 
              href="/search" 
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-brand-orange transition-smooth"
              title="Global Search"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Bookmarks */}
            <Link 
              href="/dashboard" 
              className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-brand-orange transition-smooth"
              title="My Saved Items"
            >
              <span className="sr-only">Saved items</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              {bookmarks.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white ring-2 ring-white animate-pulse-soft">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Submit Opportunity */}
            <Link 
              href="/submit" 
              className="flex items-center gap-1 text-sm font-semibold bg-brand-orange hover:bg-brand-orangeHover text-white px-3 py-1.5 rounded-lg shadow-sm transition-smooth"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Submit</span>
            </Link>

            {/* User Auth */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-1 p-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-smooth"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-brand-blue to-brand-lightNavy text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <ChevronDown className="h-3 w-3 text-slate-500" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-3 py-2 text-xs border-b border-slate-100">
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link 
                      href="/dashboard" 
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-smooth"
                    >
                      <User className="h-4 w-4" />
                      <span>My Dashboard</span>
                    </Link>
                    <button 
                      onClick={() => { logout(); setShowProfileDropdown(false); }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-smooth text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-sm font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg transition-smooth"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Search link */}
            <Link href="/search" className="p-2 text-slate-600">
              <Search className="h-5 w-5" />
            </Link>

            {/* Bookmarks link */}
            <Link href="/dashboard" className="relative p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              {bookmarks.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[8px] font-bold text-white ring-1 ring-white">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Menu icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-brand-orange focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-3">
            <div className="flex flex-col gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between text-sm bg-slate-100 py-1.5 px-3 rounded-lg">
                <span className="text-slate-500">Category: <span className="font-semibold text-brand-textNavy">{currentCategoryLabel}</span></span>
                <button 
                  onClick={() => { setIsCategoryModalOpen(true); setIsOpen(false); }}
                  className="font-bold text-brand-orange underline text-xs"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-base font-semibold hover:bg-slate-50 hover:text-brand-orange ${
                      isActive ? 'text-brand-orange bg-orange-50/50' : 'text-slate-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col gap-2 border-t border-slate-100">
              <Link 
                href="/submit"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white py-2 rounded-xl font-bold transition-smooth"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Submit Opportunity</span>
              </Link>
              
              {user ? (
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[150px]">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="text-xs font-bold text-red-600 flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setShowLoginModal(true); setIsOpen(false); }}
                  className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-xl text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-float-less">
            <div className="relative p-6 border-b border-slate-100 bg-gradient-to-tr from-brand-blue to-brand-lightNavy text-white">
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-bold">Student Sign In</h3>
              <p className="text-xs text-white/70 mt-1">Unlock saved opportunities and bookmark custom selections!</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@school.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange text-sm transition-smooth"
                />
              </div>

              <div className="pt-2 text-center text-xs text-slate-400">
                🚀 Note: This uses local student authentication for easy testing.
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-3 rounded-xl shadow-md transition-smooth flex items-center justify-center gap-1"
              >
                <Sparkles className="h-4 w-4" />
                <span>Enter OpportunityHub</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
