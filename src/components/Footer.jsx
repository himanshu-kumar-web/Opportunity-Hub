import React from 'react';
import Link from 'next/link';
import { GraduationCap, Github, Mail, Shield, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo & Pitch */}
          <div className="space-y-4 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-blue to-brand-orange text-white shadow">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold tracking-tight text-brand-textNavy">
                Opportunity<span className="text-brand-orange">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Empowering students to unlock their potential by bridging the gap between talent and available funding, training, and careers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-brand-orange transition-smooth">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-orange transition-smooth">
                <Shield className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-orange transition-smooth">
                <BookOpen className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Discover</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/scholarships" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth">
                      Scholarships
                    </Link>
                  </li>
                  <li>
                    <Link href="/schemes" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth">
                      Gov Schemes
                    </Link>
                  </li>
                  <li>
                    <Link href="/loans" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth">
                      Education Loans
                    </Link>
                  </li>
                  <li>
                    <Link href="/internships" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth">
                      Internships
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Other Portals</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/competitions" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth">
                      Hackathons
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth">
                      Online Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth">
                      Career Paths
                    </Link>
                  </li>
                  <li>
                    <Link href="/submit" className="text-sm text-slate-500 hover:text-brand-orange transition-smooth font-semibold">
                      Submit Opportunity
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Join Us</h3>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  OpportunityHub is open source and community-driven. Share new resources or insights to help fellow peers grow.
                </p>
                <div className="mt-4">
                  <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-brand-orangeHover transition-smooth">
                    <span>Read Tips & Guides</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} OpportunityHub. All rights reserved. Built for students.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-brand-orange transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition-smooth">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
