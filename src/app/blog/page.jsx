'use client';

import React, { useState } from 'react';
import { 
  BookOpen, ChevronDown, ChevronUp, Clock, 
  ArrowLeft, Calendar, FileText, CheckCircle2,
  GraduationCap, Briefcase, Landmark, User, ArrowRight 
} from 'lucide-react';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 'p1',
      title: 'How to Apply for Scholarships: The National Scholarship Portal (NSP) Guide',
      category: 'Scholarships',
      date: 'June 15, 2026',
      readTime: '6 min read',
      icon: <GraduationCap className="h-5 w-5 text-brand-orange" />,
      color: 'border-orange-200 bg-orange-50/20 text-brand-orange',
      excerpt: 'Struggling to navigate the National Scholarship Portal (NSP)? Read this detailed roadmap outlining mandatory documents, income verification, and timeline checks.',
      content: `Applying for government aid on the National Scholarship Portal (NSP) can feel overwhelming, but breaking it down step-by-step makes it simple.

### 1. Document Checklist
Before registering, gather these key documents:
- Adhaar Card / Adhaar Enrollment ID
- Previous year marks sheet (minimum 50% required for most scholarships)
- Income Certificate issued by competent state authorities (usually must be < ₹2.0 LPA or ₹2.5 LPA)
- Caste Certificate (for SC/ST/OBC categories)
- Minority Community Declaration (if applicable)
- Active Bank Passbook (linked with Aadhaar number)
- Bonafide Certificate from School/College

### 2. Registration Flow
- **Fresh Registration**: Visit scholarships.gov.in and click "New Registration". Agree to the guidelines and fill in your basic details (state, scheme type: Pre-matric vs Post-matric, name, email, phone, bank details).
- **Receive OTP**: You will receive an application ID and password via SMS.
- **Login and Fill Form**: Log in, reset the password, and fill in the detailed form (academic details, background details, fees details).

### 3. Scheme Selection
Once your profile details are saved, the system will automatically display eligible schemes. Make sure to double check the criteria for central vs state schemes. Select the scheme you qualify for, upload files (needed only for scholarships > ₹50,000), and hit Submit.

### 4. Institution Verification
After online submission, print the draft. You MUST submit this hardcopy to your college/school scholarship officer. They will verify your application on the NSP portal. Keep tracking the status (e.g. "Verified by School", "Sent to District Officer") to resolve any corrections.`
    },
    {
      id: 'p2',
      title: 'Crafting the Perfect Statement of Purpose (SOP) for NGO Funding',
      category: 'Funding Tips',
      date: 'May 28, 2026',
      readTime: '5 min read',
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      color: 'border-blue-200 bg-blue-50/20 text-blue-500',
      excerpt: 'Most private scholarships (e.g. Reliance, HDFC) ask for an essay. Learn how to detail your aspirations, financial need, and community vision to win reviewers.',
      content: `Private NGO and corporate scholarships look beyond grades. They want to know who you are and why they should invest in you. The SOP is your single biggest chance to stand out.

### 1. Hook the Reviewer (First Paragraph)
Start with a compelling personal story rather than "My name is John and I want this scholarship." Discuss the exact moment you decided to pursue your major (e.g., watching a bridge collapse that inspired you to become a Civil Engineer, or coding your first website).

### 2. State Your Financial Context Honestly
Do not just list bills; explain the emotional and structural realities. E.g. "As the eldest child of a single agricultural laborer, my college tuition is equal to 80% of our annual household earnings." This provides clear, relatable context for the committee.

### 3. Detail Your Long-Term Impact
How will this funding help you help others? Corporates love social responsibility.
- **Good**: "I want to graduate and get a job in Bangalore."
- **Winning**: "This funding will allow me to study Computer Science, equipping me to build affordable mobile diagnostic tools for rural clinics in my home district."

### 4. Format and Polish
Keep it between 500-700 words. Check for grammatical errors. Ask a teacher or mentor to read it first for feedback.`
    },
    {
      id: 'p3',
      title: 'Education Loans Decoded: Public Banks vs Subsidized Schemes',
      category: 'Student Loans',
      date: 'April 14, 2026',
      readTime: '7 min read',
      icon: <Landmark className="h-5 w-5 text-emerald-500" />,
      color: 'border-emerald-200 bg-emerald-50/20 text-emerald-500',
      excerpt: 'Demystifying collateral requirements, moratorium holidays, and government interest subsidies under the CSIS scheme.',
      content: `Borrowing for college is a major decision. Understanding the details can save you thousands in interest payments after graduation.

### 1. What is the Moratorium Period?
Unlike commercial loans, education loans offer a "repayment holiday" called the moratorium. This typically covers the entire duration of your course plus an additional 6 to 12 months, allowing you to secure a job before making monthly principal payments.

### 2. Collateral-Free Thresholds
In India, loans up to **₹4.0 Lakhs** do not require security or co-borrowers. Loans between **₹4.0 Lakhs and ₹7.5 Lakhs** require a third-party guarantee but no physical security. Loans above **₹7.5 Lakhs** usually require physical collateral (land, house, fixed deposits).

### 3. Central Sector Interest Subsidy (CSIS)
This is a government scheme that pays the interest during your course period if:
- Your family annual income is < ₹4.5 LPA.
- You are enrolled in a professional course in an accredited college.
This saves you significant amounts, preventing interest from compounding while you study.`
    },
    {
      id: 'p4',
      title: 'How to Land Your First Tech Internship as a Self-Taught Developer',
      category: 'Career Path',
      date: 'March 30, 2026',
      readTime: '8 min read',
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      color: 'border-purple-200 bg-purple-50/20 text-purple-500',
      excerpt: 'Build a standout portfolio, optimize your LinkedIn profile, and prepare for structural algorithmic coding interviews.',
      content: `Landing a tech role without a premium university degree requires strategic branding. Here is a battle-tested roadmap:

### 1. Build 3 Core Portfolio Projects
Avoid generic todo apps. Build:
- A real-world business tool (e.g. scheduling app for local barbers).
- A complex API integration (e.g. dashboard showing local air quality with map overlays).
- An open-source contribution or tool (e.g. npm library or Figma plugin).
Host them on GitHub with comprehensive README files.

### 2. Optimize Your LinkedIn Profile
- Use a clean profile photo.
- Write a headline detailing your tech stack, e.g., "Full-Stack Developer | React, Node.js, Next.js".
- Toggle your profile settings to "Open to Work" for recruiter visibility.

### 3. Master Coding Interviews
Practice core data structures (Arrays, Hash Maps, Linked Lists, Trees). Practice 2-3 problems daily on platforms like LeetCode. Don't memorize solutions; understand the fundamental algorithmic approaches.`
    }
  ];

  if (selectedPost) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orangeHover mb-6 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </button>

        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${selectedPost.color}`}>
              {selectedPost.icon}
              <span>{selectedPost.category}</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-textNavy leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {selectedPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {selectedPost.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                By OpportunityHub Editors
              </span>
            </div>
          </div>

          <div 
            className="border-t border-slate-100 pt-6 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line prose"
          >
            {selectedPost.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold text-brand-textNavy tracking-tight">Tips, Guides & Articles</h1>
        <p className="text-sm text-slate-500 mt-1.5">Expert guides on drafting scholarship essays, passing interviews, and obtaining loans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-smooth flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${post.color}`}>
                {post.icon}
                <span>{post.category}</span>
              </span>

              <h2 className="text-lg font-bold text-slate-800 line-clamp-2 leading-snug hover:text-brand-orange transition-smooth">
                {post.title}
              </h2>

              <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">
                {post.readTime}
              </span>

              <button
                onClick={() => setSelectedPost(post)}
                className="flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-orangeHover hover:underline transition-smooth"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
