// ============================================
// MIRZA STUDY CENTRE - COURSE DATA
// Location: Beside Shibli Inter College, Pandey Bazar, Azamgarh
// Classes: Class 9-12 (CBSE, ICSE & U.P. Board) & BSc
// Subjects: Physics, Chemistry, Biology, Mathematics, English, Commerce
// ============================================

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  instructorBio: string;
  price: number;           // Per month (₹1000 per subject)
  price6Months?: number;   // Discounted when paying 6 months at once (₹5,000)
  price12Months?: number;  // Discounted when paying 12 months at once (₹10,000)
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  level: 'Class 6-8' | 'Class 9-10' | 'Class 11-12' | 'BSc';
  category: string;
  image: string;
  lessons: number;
  language: string;
  lastUpdated: string;
  syllabus: string[];
  schedule: string;
  batchSize: number;
  instructorId: string;
}

export const courses: Course[] = [
  // ============================================
  // PHYSICS COURSES - Zeeshan Sir
  // ============================================
  {
    id: '1',
    title: 'Physics for Class 9-10 (CBSE/ICSE/U.P. Board)',
    description: 'Complete physics course covering Motion, Force, Work & Energy, Sound, Light, and Electricity. Perfect preparation for board exams with practical demonstrations.',
    instructor: 'Zeeshan Sir',
    instructorAvatar: 'ZS',
    instructorBio: 'MSc Physics, 5+ years teaching experience, Expert in board exam preparation',
    price: 1000,
    price6Months: 5000,
    rating: 4.9,
    reviews: 245,
    students: 1250,
    duration: '6 months',
    level: 'Class 9-10',
    category: 'Physics',
    image: '⚛️',
    lessons: 120,
    language: 'Hindi & English',
    lastUpdated: '2024-01-15',
    syllabus: ['Motion & Laws of Motion', 'Work, Energy & Power', 'Sound & Light', 'Electricity & Magnetism', 'Practical Lab Sessions'],
    schedule: 'Mon, Wed, Fri - 4:00 PM to 5:30 PM',
    batchSize: 25,
    instructorId: '1'
  },
  {
    id: '2',
    title: 'Physics for Class 11-12 (CBSE/ICSE/U.P. Board)',
    description: 'Advanced physics covering Mechanics, Thermodynamics, Optics, Modern Physics. Includes JEE & NEET level problem solving and previous year questions.',
    instructor: 'Zeeshan Sir',
    instructorAvatar: 'ZS',
    instructorBio: 'MSc Physics, 5+ years teaching experience, Expert in board exam preparation',
    price: 1000,
    price12Months: 10000,
    rating: 4.8,
    reviews: 189,
    students: 890,
    duration: '12 months',
    level: 'Class 11-12',
    category: 'Physics',
    image: '⚛️',
    lessons: 240,
    language: 'Hindi & English',
    lastUpdated: '2024-01-20',
    syllabus: ['Mechanics & Rotational Motion', 'Thermodynamics', 'Waves & Optics', 'Electrostatics & Current', 'Modern Physics & Semiconductors'],
    schedule: 'Tue, Thu, Sat - 5:00 PM to 7:00 PM',
    batchSize: 20,
    instructorId: '1'
  },
  {
    id: '3',
    title: 'BSc Physics (Semester 1-6)',
    description: 'Complete BSc Physics coaching covering Classical Mechanics, Quantum Physics, Electrodynamics, Statistical Mechanics, and Lab practicals.',
    instructor: 'Zeeshan Sir',
    instructorAvatar: 'ZS',
    instructorBio: 'MSc Physics, 5+ years teaching experience, Expert in board exam preparation',
    price: 1000,
    price6Months: 5000,
    rating: 4.7,
    reviews: 78,
    students: 245,
    duration: '6 months per semester',
    level: 'BSc',
    category: 'Physics',
    image: '⚛️',
    lessons: 150,
    language: 'Hindi & English',
    lastUpdated: '2024-01-10',
    syllabus: ['Classical Mechanics', 'Quantum Mechanics', 'Electrodynamics', 'Statistical Mechanics', 'Solid State Physics'],
    schedule: 'Mon, Wed, Fri - 6:00 PM to 8:00 PM',
    batchSize: 15,
    instructorId: '1'
  },

  // ============================================
  // CHEMISTRY COURSES - Ahmar Sir & Shahbaz Sir
  // ============================================
  {
    id: '4',
    title: 'Chemistry for Class 9-10 (CBSE/ICSE/U.P. Board)',
    description: 'Foundation chemistry covering Atoms & Molecules, Chemical Reactions, Acids & Bases, Metals & Non-metals with practical experiments.',
    instructor: 'Ahmar Sir',
    instructorAvatar: 'AS',
    instructorBio: 'MSc Chemistry, 6+ years teaching experience, Expert in Inorganic & Physical Chemistry',
    price: 1000,
    price6Months: 5000,
    rating: 4.8,
    reviews: 198,
    students: 1100,
    duration: '6 months',
    level: 'Class 9-10',
    category: 'Chemistry',
    image: '🧪',
    lessons: 100,
    language: 'Hindi & English',
    lastUpdated: '2024-01-18',
    syllabus: ['Matter & Its Nature', 'Atoms & Molecules', 'Chemical Reactions', 'Acids, Bases & Salts', 'Metals & Non-metals'],
    schedule: 'Mon, Wed, Fri - 5:30 PM to 7:00 PM',
    batchSize: 25,
    instructorId: '2'
  },
  {
    id: '5',
    title: 'Chemistry for Class 11-12 (CBSE/ICSE/U.P. Board)',
    description: 'Complete Organic, Inorganic & Physical Chemistry. Covers all board exam and competitive exam topics with extensive problem practice.',
    instructor: 'Shahbaz Sir',
    instructorAvatar: 'SS',
    instructorBio: 'MSc Chemistry, 5+ years teaching experience, Expert in Organic Chemistry',
    price: 1000,
    price12Months: 10000,
    rating: 4.9,
    reviews: 167,
    students: 780,
    duration: '12 months',
    level: 'Class 11-12',
    category: 'Chemistry',
    image: '🧪',
    lessons: 220,
    language: 'Hindi & English',
    lastUpdated: '2024-01-22',
    syllabus: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Coordination Compounds', 'Biomolecules & Polymers'],
    schedule: 'Tue, Thu, Sat - 4:00 PM to 6:00 PM',
    batchSize: 20,
    instructorId: '3'
  },
  {
    id: '6',
    title: 'BSc Chemistry (Semester 1-6)',
    description: 'Comprehensive BSc Chemistry coaching including Organic, Inorganic, Physical Chemistry, Spectroscopy, and practical lab sessions.',
    instructor: 'Ahmar Sir & Shahbaz Sir',
    instructorAvatar: 'CS',
    instructorBio: 'Combined expertise in all branches of Chemistry',
    price: 1000,
    price6Months: 5000,
    rating: 4.6,
    reviews: 65,
    students: 190,
    duration: '6 months per semester',
    level: 'BSc',
    category: 'Chemistry',
    image: '🧪',
    lessons: 140,
    language: 'Hindi & English',
    lastUpdated: '2024-01-08',
    syllabus: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Spectroscopy'],
    schedule: 'Mon, Wed, Fri - 4:00 PM to 6:00 PM',
    batchSize: 15,
    instructorId: '2'
  },

  // ============================================
  // BIOLOGY COURSES - Asad Ayyub Sir & Zaid Sir
  // ============================================
  {
    id: '7',
    title: 'Biology for Class 9-10 (CBSE/ICSE/U.P. Board)',
    description: 'Complete biology covering Cell Biology, Life Processes, Heredity, Evolution, and Environment. Includes diagram practice and NCERT solutions.',
    instructor: 'Asad Ayyub Sir',
    instructorAvatar: 'AA',
    instructorBio: 'MSc Biology, 6+ years teaching experience, Expert in Botany & Zoology',
    price: 1000,
    price6Months: 5000,
    rating: 4.8,
    reviews: 212,
    students: 980,
    duration: '6 months',
    level: 'Class 9-10',
    category: 'Biology',
    image: '🧬',
    lessons: 90,
    language: 'Hindi & English',
    lastUpdated: '2024-01-12',
    syllabus: ['Cell Structure & Function', 'Life Processes', 'Control & Coordination', 'Reproduction', 'Heredity & Evolution'],
    schedule: 'Tue, Thu, Sat - 5:00 PM to 6:30 PM',
    batchSize: 25,
    instructorId: '4'
  },
  {
    id: '8',
    title: 'Biology for Class 11-12 (CBSE/ICSE/U.P. Board)',
    description: 'Comprehensive NEET Biology covering Botany & Zoology. Includes NCERT line-by-line analysis, diagrams, and 10,000+ MCQ practice.',
    instructor: 'Zaid Sir',
    instructorAvatar: 'ZD',
    instructorBio: 'MSc Zoology, 4+ years teaching experience, NEET Biology specialist',
    price: 1000,
    price12Months: 10000,
    rating: 4.9,
    reviews: 289,
    students: 1450,
    duration: '12 months',
    level: 'Class 11-12',
    category: 'Biology',
    image: '🧬',
    lessons: 280,
    language: 'Hindi & English',
    lastUpdated: '2024-01-25',
    syllabus: ['Cell Biology & Biomolecules', 'Plant Physiology', 'Human Physiology', 'Genetics & Evolution', 'Ecology & Environment'],
    schedule: 'Mon, Wed, Fri, Sat - 6:00 PM to 8:00 PM',
    batchSize: 30,
    instructorId: '5'
  },
  {
    id: '9',
    title: 'BSc Biology / Zoology (Semester 1-6)',
    description: 'Complete BSc Biology/Zoology coaching covering Plant Anatomy, Animal Diversity, Physiology, Genetics, Ecology, and practical laboratory sessions.',
    instructor: 'Asad Ayyub Sir & Zaid Sir',
    instructorAvatar: 'BT',
    instructorBio: 'Combined expertise in Botany & Zoology for complete BSc preparation',
    price: 1000,
    price6Months: 5000,
    rating: 4.7,
    reviews: 54,
    students: 165,
    duration: '6 months per semester',
    level: 'BSc',
    category: 'Biology',
    image: '🧬',
    lessons: 130,
    language: 'Hindi & English',
    lastUpdated: '2024-01-05',
    syllabus: ['Plant Anatomy & Physiology', 'Animal Diversity', 'Genetics', 'Ecology', 'Biotechnology'],
    schedule: 'Tue, Thu - 5:00 PM to 7:00 PM',
    batchSize: 15,
    instructorId: '4'
  },

  // ============================================
  // COMMERCE COURSES - Dr. Abul Vaish Sir
  // ============================================
  {
    id: '10',
    title: 'Commerce for Class 11-12 (CBSE/ICSE/U.P. Board)',
    description: 'Complete Commerce coaching covering Accountancy, Business Studies, Economics. Includes practical problems and previous year papers.',
    instructor: 'Dr. Abul Vaish Sir',
    instructorAvatar: 'AV',
    instructorBio: 'PhD in Commerce, 8+ years teaching experience, Expert in Accountancy & Business Studies',
    price: 1000,
    price12Months: 10000,
    rating: 4.8,
    reviews: 156,
    students: 620,
    duration: '12 months',
    level: 'Class 11-12',
    category: 'Commerce',
    image: '💼',
    lessons: 200,
    language: 'Hindi & English',
    lastUpdated: '2024-01-14',
    syllabus: ['Financial Accounting', 'Business Studies', 'Economics', 'Statistics', 'Company Accounts & Analysis'],
    schedule: 'Mon, Wed, Fri - 5:00 PM to 7:00 PM',
    batchSize: 25,
    instructorId: '7'
  },

  // ============================================
  // MATHEMATICS COURSES - Shafee Sir
  // ============================================
  {
    id: '11',
    title: 'Mathematics for Class 6-8 (Foundation)',
    description: 'Build strong math foundation covering Numbers, Algebra basics, Geometry, and Problem Solving. Makes math easy and interesting!',
    instructor: 'Shafee Sir',
    instructorAvatar: 'SF',
    instructorBio: 'MSc Mathematics, 7+ years teaching experience, Known for making maths simple',
    price: 1000,
    price6Months: 5000,
    rating: 4.8,
    reviews: 178,
    students: 890,
    duration: '6 months',
    level: 'Class 6-8',
    category: 'Mathematics',
    image: '📐',
    lessons: 80,
    language: 'Hindi & English',
    lastUpdated: '2024-01-16',
    syllabus: ['Number System', 'Basic Algebra', 'Geometry Basics', 'Mensuration', 'Data Handling'],
    schedule: 'Mon, Wed, Fri - 4:00 PM to 5:00 PM',
    batchSize: 30,
    instructorId: '6'
  },
  {
    id: '12',
    title: 'Mathematics for Class 9-10 (CBSE/ICSE/U.P. Board)',
    description: 'Complete math course for board exams covering Algebra, Geometry, Trigonometry, Statistics. Includes shortcuts and previous year papers.',
    instructor: 'Shafee Sir',
    instructorAvatar: 'SF',
    instructorBio: 'MSc Mathematics, 7+ years teaching experience, Known for making maths simple',
    price: 1000,
    price6Months: 5000,
    rating: 4.9,
    reviews: 267,
    students: 1320,
    duration: '6 months',
    level: 'Class 9-10',
    category: 'Mathematics',
    image: '📐',
    lessons: 110,
    language: 'Hindi & English',
    lastUpdated: '2024-01-19',
    syllabus: ['Real Numbers & Polynomials', 'Linear Equations', 'Quadratic Equations', 'Triangles & Circles', 'Trigonometry & Statistics'],
    schedule: 'Tue, Thu, Sat - 4:00 PM to 5:30 PM',
    batchSize: 25,
    instructorId: '6'
  },
  {
    id: '13',
    title: 'Mathematics for Class 11-12 (CBSE/ICSE/U.P. Board)',
    description: 'Advanced mathematics for board and competitive exam preparation covering Calculus, Algebra, Coordinate Geometry, Vectors. 5000+ problems with solutions.',
    instructor: 'Shafee Sir',
    instructorAvatar: 'SF',
    instructorBio: 'MSc Mathematics, 7+ years teaching experience, Known for making maths simple',
    price: 1000,
    price12Months: 10000,
    rating: 4.8,
    reviews: 198,
    students: 920,
    duration: '12 months',
    level: 'Class 11-12',
    category: 'Mathematics',
    image: '📐',
    lessons: 260,
    language: 'Hindi & English',
    lastUpdated: '2024-01-21',
    syllabus: ['Calculus (Limits, Derivatives, Integration)', 'Algebra & Complex Numbers', 'Coordinate Geometry', 'Vectors & 3D Geometry', 'Probability & Statistics'],
    schedule: 'Mon, Wed, Fri, Sat - 5:30 PM to 7:30 PM',
    batchSize: 20,
    instructorId: '6'
  },

  // ============================================
  // ENGLISH COURSES - Saifee Sir
  // ============================================
  {
    id: '14',
    title: 'English for Class 6-8 (Grammar & Writing)',
    description: 'Foundation English covering Grammar, Vocabulary, Reading Comprehension, and Creative Writing. Build confidence in spoken & written English.',
    instructor: 'Saifee Sir',
    instructorAvatar: 'SE',
    instructorBio: 'MA English, 5+ years teaching experience, English Speaking Course specialist',
    price: 1000,
    price6Months: 5000,
    rating: 4.7,
    reviews: 145,
    students: 720,
    duration: '6 months',
    level: 'Class 6-8',
    category: 'English',
    image: '📚',
    lessons: 70,
    language: 'English',
    lastUpdated: '2024-01-13',
    syllabus: ['Parts of Speech', 'Tenses & Sentence Structure', 'Vocabulary Building', 'Reading Comprehension', 'Essay & Letter Writing'],
    schedule: 'Tue, Thu - 4:00 PM to 5:00 PM',
    batchSize: 25,
    instructorId: '8'
  },
  {
    id: '15',
    title: 'English for Class 9-10 (CBSE/ICSE/U.P. Board)',
    description: 'Complete English preparation for board exams including Literature, Grammar, Writing Skills. Focus on scoring maximum marks.',
    instructor: 'Saifee Sir',
    instructorAvatar: 'SE',
    instructorBio: 'MA English, 5+ years teaching experience, English Speaking Course specialist',
    price: 1000,
    price6Months: 5000,
    rating: 4.8,
    reviews: 187,
    students: 890,
    duration: '6 months',
    level: 'Class 9-10',
    category: 'English',
    image: '📚',
    lessons: 85,
    language: 'English',
    lastUpdated: '2024-01-17',
    syllabus: ['Literature (Prose & Poetry)', 'Advanced Grammar', 'Writing Skills', 'Reading Comprehension', 'Speaking & Listening'],
    schedule: 'Mon, Wed, Fri - 5:00 PM to 6:00 PM',
    batchSize: 25,
    instructorId: '8'
  },
  {
    id: '16',
    title: 'English for Class 11-12 (Literature & Communication)',
    description: 'Advanced English covering Literature analysis, Academic Writing, Communication Skills. Perfect for board exams and competitive entrance.',
    instructor: 'Saifee Sir',
    instructorAvatar: 'SE',
    instructorBio: 'MA English, 5+ years teaching experience, English Speaking Course specialist',
    price: 1000,
    price12Months: 10000,
    rating: 4.6,
    reviews: 98,
    students: 450,
    duration: '12 months',
    level: 'Class 11-12',
    category: 'English',
    image: '📚',
    lessons: 100,
    language: 'English',
    lastUpdated: '2024-01-11',
    syllabus: ['English Literature', 'Advanced Writing', 'Communication Skills', 'Critical Analysis', 'Public Speaking'],
    schedule: 'Tue, Thu, Sat - 6:00 PM to 7:00 PM',
    batchSize: 20,
    instructorId: '8'
  },
];

// Categories for filtering
export const categories = ['All', 'Physics', 'Chemistry', 'Biology', 'Commerce', 'Mathematics', 'English'];

// Levels for filtering
export const levels = ['All', 'Class 6-8', 'Class 9-10', 'Class 11-12', 'BSc'];

// Instructors
export const instructors = [
  {
    id: '1',
    name: 'Zeeshan Sir',
    avatar: 'ZS',
    subject: 'Physics',
    qualification: 'MSc Physics',
    experience: '5+ years',
    bio: 'Expert in making complex physics concepts easy to understand. Specializes in board exam preparation for CBSE, ICSE & U.P. Board.',
  },
  {
    id: '2',
    name: 'Ahmar Sir',
    avatar: 'AS',
    subject: 'Chemistry',
    qualification: 'MSc Chemistry',
    experience: '6+ years',
    bio: 'Expert in Inorganic & Physical Chemistry with a passion for practical demonstrations and conceptual clarity.',
  },
  {
    id: '3',
    name: 'Shahbaz Sir',
    avatar: 'SS',
    subject: 'Chemistry',
    qualification: 'MSc Chemistry',
    experience: '5+ years',
    bio: 'Specialist in Organic Chemistry. Known for his unique approach to solving complex chemistry problems.',
  },
  {
    id: '4',
    name: 'Asad Ayyub Sir',
    avatar: 'AA',
    subject: 'Biology',
    qualification: 'MSc Biology',
    experience: '6+ years',
    bio: 'Expert in Botany and Biology. Focuses on NCERT-based learning with diagram practice for board exams.',
  },
  {
    id: '5',
    name: 'Zaid Sir',
    avatar: 'ZD',
    subject: 'Biology',
    qualification: 'MSc Zoology',
    experience: '4+ years',
    bio: 'Specialist in Zoology and NEET Biology preparation with hands-on practical approach to teaching.',
  },
  {
    id: '6',
    name: 'Shafee Sir',
    avatar: 'SF',
    subject: 'Mathematics',
    qualification: 'MSc Mathematics',
    experience: '7+ years',
    bio: 'Known for making math simple and interesting. Expert in board exam and competitive exam Mathematics.',
  },
  {
    id: '7',
    name: 'Dr. Abul Vaish Sir',
    avatar: 'AV',
    subject: 'Commerce',
    qualification: 'PhD in Commerce',
    experience: '8+ years',
    bio: 'Expert in Accountancy, Business Studies, and Economics. Helps students build strong foundation in Commerce.',
  },
  {
    id: '8',
    name: 'Saifee Sir',
    avatar: 'SE',
    subject: 'English',
    qualification: 'MA English',
    experience: '5+ years',
    bio: 'Specialist in English Speaking Course, Grammar, and Literature. Helps students build confidence in spoken & written English.',
  },
];

// Inquiry form type
export interface StudentInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'enrolled' | 'closed';
}
