// Mappings of categories for eligibility checks
export const CATEGORY_LABELS = {
  // Category 1 - School
  'class-9-10': 'Class 9-10',
  'class-11-12-science': 'Class 11-12 (Science)',
  'class-11-12-commerce': 'Class 11-12 (Commerce)',
  'class-11-12-arts': 'Class 11-12 (Arts)',
  
  // Category 2 - After 12th
  'btech-be': 'B.Tech / B.E (Engineering)',
  'mbbs-bds': 'MBBS / BDS / Medical',
  'bsc': 'B.Sc (Science)',
  'ba': 'B.A (Arts & Humanities)',
  'bcom': 'B.Com (Commerce)',
  'bba-bms': 'BBA / BMS',
  'diploma-polytechnic': 'Diploma / Polytechnic (UG)',
  'law-llb': 'Law (LLB)',
  'design': 'Design (NID, NIFT etc.)',
  'agriculture': 'Agriculture (B.Sc Ag)',
  
  // Category 3 - Postgraduate
  'mtech-me': 'M.Tech / M.E',
  'mba': 'MBA',
  'msc': 'M.Sc',
  'ma': 'M.A',
  'mca': 'MCA',
  'md-ms': 'MD / MS (Medical PG)',
  
  // Category 4 - Diploma / Vocational
  'iti': 'ITI Courses',
  'polytechnic-diploma': 'Polytechnic Diploma',
  'skills-certificate': 'Skill-based Certificates'
};

export const CATEGORY_GROUPS = {
  'School': ['class-9-10', 'class-11-12-science', 'class-11-12-commerce', 'class-11-12-arts'],
  'After 12th / UG': ['btech-be', 'mbbs-bds', 'bsc', 'ba', 'bcom', 'bba-bms', 'diploma-polytechnic', 'law-llb', 'design', 'agriculture'],
  'Postgraduate': ['mtech-me', 'mba', 'msc', 'ma', 'mca', 'md-ms'],
  'Diploma / Vocational': ['iti', 'polytechnic-diploma', 'skills-certificate']
};

export const scholarships = [
  {
    id: 's1',
    name: 'National Scholarship Portal (NSP) Post-Matric Scholarship',
    amount: 15000,
    deadline: '2026-10-31',
    eligibility: 'Minimum 50% marks in previous final exam. Family income < ₹2.0 LPA. SC/ST/OBC/Minority students.',
    categories: ['class-11-12-science', 'class-11-12-commerce', 'class-11-12-arts', 'btech-be', 'bsc', 'bcom', 'ba', 'mbbs-bds'],
    state: 'Central (India)',
    type: 'Government',
    criteria: 'Minority',
    link: 'https://scholarships.gov.in/',
    is_verified: true
  },
  {
    id: 's2',
    name: 'Reliance Foundation Undergraduate Scholarships',
    amount: 200000,
    deadline: '2026-07-15',
    eligibility: 'Regular full-time UG students in any stream. Household income < ₹15 LPA. Merit-cum-means.',
    categories: ['btech-be', 'bsc', 'ba', 'bcom', 'bba-bms', 'law-llb', 'design', 'agriculture'],
    state: 'All India',
    type: 'Private/NGO',
    criteria: 'Need-based',
    link: 'https://www.reliancefoundation.org/',
    is_verified: true
  },
  {
    id: 's3',
    name: 'Pragati Scholarship Scheme for Girl Students',
    amount: 50000,
    deadline: '2026-08-30',
    eligibility: 'Girl students admitted to 1st year of Degree/Diploma course in AICTE approved institution. Max 2 girls per family.',
    categories: ['btech-be', 'diploma-polytechnic', 'polytechnic-diploma'],
    state: 'Central (India)',
    type: 'Government',
    criteria: 'General',
    link: 'https://www.aicte-india.org/',
    is_verified: true
  },
  {
    id: 's4',
    name: 'L\'Oréal India For Young Women In Science Scholarship',
    amount: 250000,
    deadline: '2026-07-20',
    eligibility: 'Passed Class 12 Science in current year with min 85%. Family income < ₹6 LPA. For female students pursuing science/engineering.',
    categories: ['btech-be', 'mbbs-bds', 'bsc', 'agriculture'],
    state: 'All India',
    type: 'Private/NGO',
    criteria: 'Merit-based',
    link: 'https://www.loreal.com/',
    is_verified: true
  },
  {
    id: 's5',
    name: 'HDFC Badhte Kadam Scholarship',
    amount: 100000,
    deadline: '2026-06-25',
    eligibility: 'Students in Class 9-12 or pursuing UG/PG courses. Family income < ₹6 LPA. Focus on crisis support.',
    categories: ['class-9-10', 'class-11-12-science', 'class-11-12-commerce', 'class-11-12-arts', 'btech-be', 'mtech-me', 'mba', 'msc', 'ma', 'mca'],
    state: 'All India',
    type: 'Private/NGO',
    criteria: 'Need-based',
    link: 'https://www.buddy4study.com/',
    is_verified: true
  },
  {
    id: 's6',
    name: 'Pre-Matric Scholarships for Minorities',
    amount: 8000,
    deadline: '2026-09-15',
    eligibility: 'Students of Class 9 or 10. Minimum 50% in previous exam. Annual family income < ₹1 LPA.',
    categories: ['class-9-10'],
    state: 'All India',
    type: 'Government',
    criteria: 'Minority',
    link: 'https://scholarships.gov.in/',
    is_verified: true
  }
];

export const schemes = [
  {
    id: 'sc1',
    name: 'PM YASASVI Scheme',
    benefit: 'OBE/EBC/DNT students get ₹75,000 p.a. (Class 9-10) and ₹1,25,000 p.a. (Class 11-12) for top school education.',
    eligibility: 'OBC/EBC/DNT categories. Family income < ₹2.5 LPA. Studying in identified top schools.',
    categories: ['class-9-10', 'class-11-12-science', 'class-11-12-commerce', 'class-11-12-arts'],
    type: 'Central',
    link: 'https://yet.nta.ac.in/'
  },
  {
    id: 'sc2',
    name: 'Saksham Scholarship Scheme',
    benefit: '₹50,000 per annum for tuition fees, books, and equipment.',
    eligibility: 'Specially-abled students (disability > 40%) pursuing technical degree/diploma at AICTE approved college.',
    categories: ['btech-be', 'diploma-polytechnic', 'polytechnic-diploma', 'mtech-me', 'mca'],
    type: 'Central',
    link: 'https://www.aicte-india.org/schemes/students-development-schemes/saksham-conducive-education'
  },
  {
    id: 'sc3',
    name: 'Delhi Ladli Scheme',
    benefit: 'Financial assistance accumulated and given to girls at the age of 18 for higher education.',
    eligibility: 'Girl children born in Delhi, family income < ₹1 LPA. Studying in Govt recognized schools.',
    categories: ['class-9-10', 'class-11-12-science', 'class-11-12-commerce', 'class-11-12-arts'],
    type: 'State (Delhi)',
    link: 'http://wcddel.in/ladli.html'
  },
  {
    id: 'sc4',
    name: 'Post Matric Scholarship for SC Students',
    benefit: '100% tuition fee waiver and monthly maintenance allowance.',
    eligibility: 'SC category students. Family annual income less than ₹2.5 Lakhs.',
    categories: ['btech-be', 'mbbs-bds', 'bsc', 'ba', 'bcom', 'mtech-me', 'mba', 'msc', 'ma', 'mca', 'iti', 'polytechnic-diploma'],
    type: 'Central',
    link: 'https://scholarships.gov.in/'
  }
];

export const loans = [
  {
    id: 'l1',
    bank_name: 'SBI Student Loan Scheme',
    max_amount: 2000000,
    interest_rate: 8.55,
    collateral_required: 'No up to ₹7.5 Lakhs',
    moratorium_period: 'Course duration + 1 year',
    categories: ['btech-be', 'mbbs-bds', 'bsc', 'ba', 'bcom', 'bba-bms', 'law-llb', 'design', 'agriculture', 'mtech-me', 'mba', 'msc', 'ma', 'mca', 'md-ms'],
    type: 'Bank',
    link: 'https://sbi.co.in/'
  },
  {
    id: 'l2',
    bank_name: 'Vidya Lakshmi Education Loan (Govt Scheme)',
    max_amount: 1500000,
    interest_rate: 7.9,
    collateral_required: 'No up to ₹4 Lakhs',
    moratorium_period: 'Course duration + 12 months',
    categories: ['btech-be', 'mbbs-bds', 'bsc', 'ba', 'bcom', 'bba-bms', 'law-llb', 'design', 'agriculture', 'mtech-me', 'mba', 'msc', 'ma', 'mca', 'md-ms', 'polytechnic-diploma'],
    type: 'Government',
    link: 'https://www.vidyalakshmi.co.in/'
  },
  {
    id: 'l3',
    bank_name: 'HDFC Credila Education Loan',
    max_amount: 4000000,
    interest_rate: 9.25,
    collateral_required: 'Yes (for larger amounts)',
    moratorium_period: 'Interest payment during course, principal starts after',
    categories: ['btech-be', 'mbbs-bds', 'mba', 'mtech-me', 'mca', 'md-ms'],
    type: 'NBFC',
    link: 'https://www.hdfccredila.com/'
  }
];

export const internships = [
  {
    id: 'i1',
    company: 'Google India',
    domain: 'Tech',
    stipend: 80000,
    duration: '3 Months',
    mode: 'On-site (Bangalore)',
    deadline: '2026-07-10',
    categories: ['btech-be', 'mtech-me', 'mca'],
    link: 'https://careers.google.com/'
  },
  {
    id: 'i2',
    company: 'Law Associates',
    domain: 'Law',
    stipend: 15000,
    duration: '2 Months',
    mode: 'Remote',
    deadline: '2026-06-30',
    categories: ['law-llb'],
    link: 'https://www.linkedin.com/'
  },
  {
    id: 'i3',
    company: 'Design Studio Corp',
    domain: 'Design',
    stipend: 25000,
    duration: '6 Months',
    mode: 'Remote',
    deadline: '2026-06-28',
    categories: ['design', 'skills-certificate'],
    link: 'https://www.internshala.com/'
  },
  {
    id: 'i4',
    company: 'Fortis Healthcare',
    domain: 'Medical',
    stipend: 30000,
    duration: '6 Months',
    mode: 'On-site',
    deadline: '2026-08-01',
    categories: ['mbbs-bds', 'md-ms'],
    link: 'https://www.fortishealthcare.com/'
  },
  {
    id: 'i5',
    company: 'Fintech Solutions',
    domain: 'Finance',
    stipend: 35000,
    duration: '3 Months',
    mode: 'Remote',
    deadline: '2026-06-24',
    categories: ['bcom', 'bba-bms', 'mba', 'class-11-12-commerce'],
    link: 'https://internshala.com/'
  }
];

export const competitions = [
  {
    id: 'c1',
    name: 'Smart India Hackathon (SIH)',
    type: 'Hackathon',
    prize: 100000,
    deadline: '2026-09-30',
    eligibility: 'Undergraduate and postgraduate students of technical colleges.',
    categories: ['btech-be', 'mtech-me', 'mca', 'polytechnic-diploma'],
    link: 'https://www.sih.gov.in/'
  },
  {
    id: 'c2',
    name: 'National Science Olympiad (NSO)',
    type: 'Olympiad',
    prize: 50000,
    deadline: '2026-10-15',
    eligibility: 'School students from Class 1 to 12.',
    categories: ['class-9-10', 'class-11-12-science'],
    link: 'https://sofworld.org/'
  },
  {
    id: 'c3',
    name: 'L’Oréal Brandstorm Case Competition',
    type: 'Case Study',
    prize: 800000,
    deadline: '2026-07-01',
    eligibility: 'All college students over 18, especially management streams.',
    categories: ['bba-bms', 'mba', 'btech-be', 'bcom'],
    link: 'https://brandstorm.loreal.com/'
  },
  {
    id: 'c4',
    name: 'TCS IT Wiz',
    type: 'Quiz',
    prize: 75000,
    deadline: '2026-08-20',
    eligibility: 'Students in Class 8 to 12.',
    categories: ['class-9-10', 'class-11-12-science', 'class-11-12-commerce', 'class-11-12-arts'],
    link: 'https://www.tcsitwiz.com/'
  }
];

export const courses = [
  {
    id: 'co1',
    title: 'NPTEL Introduction to Python Programming',
    provider: 'SWAYAM / IIT Madras',
    cost: 'Free (Exam Fee: ₹1000 for Certificate)',
    duration: '8 Weeks',
    domain: 'Coding',
    categories: ['class-11-12-science', 'btech-be', 'bsc', 'mtech-me', 'mca', 'polytechnic-diploma'],
    link: 'https://swayam.gov.in/'
  },
  {
    id: 'co2',
    title: 'Google UX Design Professional Certificate',
    provider: 'Coursera (Financial Aid Available)',
    cost: 'Paid / Subscription (Free with Aid)',
    duration: '6 Months',
    domain: 'Design',
    categories: ['design', 'btech-be', 'ba', 'skills-certificate', 'class-11-12-arts', 'class-11-12-commerce'],
    link: 'https://www.coursera.org/professional-certificates/google-ux-design'
  },
  {
    id: 'co3',
    title: 'Financial Markets and Investment Banking',
    provider: 'Microsoft / Coursera',
    cost: 'Free Audit',
    duration: '4 Weeks',
    domain: 'Finance',
    categories: ['bcom', 'bba-bms', 'mba', 'class-11-12-commerce'],
    link: 'https://www.coursera.org/'
  },
  {
    id: 'co4',
    title: 'Full Stack Web Development Bootcamp',
    provider: 'FreeCodeCamp',
    cost: 'Free',
    duration: 'Self-paced (approx 300 hours)',
    domain: 'Coding',
    categories: ['class-9-10', 'class-11-12-science', 'btech-be', 'mca', 'skills-certificate', 'polytechnic-diploma'],
    link: 'https://www.freecodecamp.org/'
  }
];

export const careerPaths = [
  {
    id: 'cp1',
    stream: 'Science',
    career_name: 'Software Engineer / AI Architect',
    entrance_exams: ['JEE Main / Advanced', 'GATE (for PG)', 'NIMCET (for MCA)'],
    salary_range: '₹6,00,000 - ₹35,00,000+ per annum',
    top_companies: ['Google', 'Microsoft', 'TCS', 'Infosys', 'Amazon', 'Meta'],
    future_scope: 'Excellent growth. High demand in AI, Cloud Computing, and Blockchain. AI impact: Assistive coding will boost developer productivity but shift focus to system architecture and prompt engineering.',
    path: '12th Science → B.Tech CS / BCA / B.Sc CS → M.Tech / MCA / M.Sc CS → Software Engineer'
  },
  {
    id: 'cp2',
    stream: 'Science',
    career_name: 'Medical Specialist / Doctor',
    entrance_exams: ['NEET UG', 'NEET PG / INI-CET'],
    salary_range: '₹8,00,000 - ₹40,00,000+ per annum',
    top_companies: ['Apollo Hospitals', 'Fortis', 'AIIMS', 'Max Healthcare', 'Self-Practice'],
    future_scope: 'Extremely high demand and stability. AI impact: Diagnostic AI tools will assist in radiography and pathology, but high empathetic communication and manual surgery precision guarantee long-term human role dominance.',
    path: '12th Science PCB → MBBS / BDS → MD / MS / Residency → Consultant Specialist'
  },
  {
    id: 'cp3',
    stream: 'Commerce',
    career_name: 'Chartered Accountant (CA)',
    entrance_exams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
    salary_range: '₹7,00,000 - ₹25,00,000+ per annum',
    top_companies: ['Deloitte', 'EY', 'KPMG', 'PwC', 'Tata Group', 'Reliance Industries'],
    future_scope: 'Stable and prestigious. AI will automate simple book-keeping, but advisory, financial auditing, tax consulting, and strategic corporate compliance will require expert CAs.',
    path: '12th Commerce → B.Com / BBA + CA Foundation → Articleship (3 years) → CA Final → Chartered Accountant'
  },
  {
    id: 'cp4',
    stream: 'Arts',
    career_name: 'UI/UX Designer',
    entrance_exams: ['UCEED', 'CEED', 'NID DAT'],
    salary_range: '₹5,00,000 - ₹20,00,000+ per annum',
    top_companies: ['Google', 'Adobe', 'Swiggy', 'Zomato', 'Design Agencies'],
    future_scope: 'Growing fast. Modern businesses are highly design-centric. AI tools will speed up wireframing, but human empathy, user testing, and behavioral design psychology remain irreplaceable.',
    path: '12th (Any/Arts) → B.Des (Design) / B.FA → M.Des → Lead Product/UX Designer'
  },
  {
    id: 'cp5',
    stream: 'Vocational',
    career_name: 'Industrial Automation Specialist',
    entrance_exams: ['State Polytechnic Entrance Exams'],
    salary_range: '₹3,00,000 - ₹9,00,000 per annum',
    top_companies: ['Siemens', 'ABB', 'L&T', 'Schneider Electric'],
    future_scope: 'High demand as manufacturing industries undergo Industry 4.0 automation. AI integration will require technicians who can set up and maintain smart IoT-enabled automation systems.',
    path: 'Class 10/12 → ITI / Polytechnic Diploma → Advanced Automation Certification → Systems Specialist'
  }
];
