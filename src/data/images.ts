// ============================================
// LOCAL IMAGES FOR MIRZA STUDY CENTRE
// All images stored in /public/images/
// ============================================

export const images = {
  // Hero and backgrounds
  hero: {
    main: '/images/hero/main.jpg',
    classroom: '/images/hero/classroom.jpg',
    students: '/images/hero/students.jpg',
    library: '/images/hero/library.jpg',
  },

  // Subject images
  subjects: {
    physics: '/images/subjects/physics.jpg',
    chemistry: '/images/subjects/chemistry.jpg',
    biology: '/images/subjects/biology.jpg',
    mathematics: '/images/subjects/mathematics.jpg',
    english: '/images/subjects/english.jpg',
    commerce: '/images/subjects/commerce.jpg',
  },

  // Course thumbnails
  courses: {
    physics910: '/images/courses/physics910.jpg',
    physics1112: '/images/courses/physics1112.jpg',
    physicsBsc: '/images/courses/physicsBsc.jpg',
    chemistry910: '/images/courses/chemistry910.jpg',
    chemistry1112: '/images/courses/chemistry1112.jpg',
    chemistryBsc: '/images/courses/chemistryBsc.jpg',
    biology910: '/images/courses/biology910.jpg',
    biology1112: '/images/courses/biology1112.jpg',
    biologyBsc: '/images/courses/biologyBsc.jpg',
    commerce1112: '/images/courses/commerce1112.jpg',
    maths68: '/images/courses/math68.jpg',
    maths910: '/images/courses/math910.jpg',
    maths1112: '/images/courses/math1112.jpg',
    english68: '/images/courses/english68.jpg',
    english910: '/images/courses/english910.jpg',
    english1112: '/images/courses/english1112.jpg',
  },

  // Teacher/instructor avatars (local SVGs)
  teachers: {
    male1: '/images/teachers/male1.svg',  // Zeeshan Sir - Physics
    male2: '/images/teachers/male2.svg',  // Ahmar Sir - Chemistry
    male3: '/images/teachers/male3.svg',  // Shahbaz Sir - Chemistry
    male4: '/images/teachers/male4.svg',  // Asad Ayyub Sir - Biology
    male5: '/images/teachers/male5.svg',  // Zaid Sir - Biology
    male6: '/images/teachers/male6.svg',  // Shafee Sir - Mathematics
    male7: '/images/teachers/male7.svg',  // Dr. Abul Vaish Sir - Commerce
    male8: '/images/teachers/male8.svg',  // Saifee Sir - English
  },

  // Feature/about images
  features: {
    classroom: '/images/hero/classroom.jpg',
    studying: '/images/features/results.jpg',
    exam: '/images/features/tests.jpg',
    success: '/images/features/results.jpg',
  },
  
  // About page image
  about: '/images/students/about.jpg',

  // Class level images
  levels: {
    foundation: '/images/levels/junior.jpg',
    secondary: '/images/levels/senior.jpg',
    senior: '/images/students/about.jpg',
    college: '/images/levels/higher.jpg',
  },

  // Testimonials/students
  students: {
    group: '/images/students/group1.jpg',
    individual1: '/images/students/individual1.jpg',
    individual2: '/images/students/individual2.jpg',
  },

  // Patterns and decorative
  patterns: {
    gradient1: '/images/patterns/gradient1.jpg',
    abstract: '/images/patterns/abstract.jpg',
  }
};

// Course image mapping by ID
export const courseImages: Record<string, string> = {
  '1': images.courses.physics910,
  '2': images.courses.physics1112,
  '3': images.courses.physicsBsc,
  '4': images.courses.chemistry910,
  '5': images.courses.chemistry1112,
  '6': images.courses.chemistryBsc,
  '7': images.courses.biology910,
  '8': images.courses.biology1112,
  '9': images.courses.biologyBsc,
  '10': images.courses.commerce1112,
  '11': images.courses.maths68,
  '12': images.courses.maths910,
  '13': images.courses.maths1112,
  '14': images.courses.english68,
  '15': images.courses.english910,
  '16': images.courses.english1112,
};

// Teacher image mapping by ID (all male teachers)
export const teacherImages: Record<string, string> = {
  '1': images.teachers.male1,    // Zeeshan Sir - Physics
  '2': images.teachers.male2,    // Ahmar Sir - Chemistry
  '3': images.teachers.male3,    // Shahbaz Sir - Chemistry
  '4': images.teachers.male4,    // Asad Ayyub Sir - Biology
  '5': images.teachers.male5,    // Zaid Sir - Biology
  '6': images.teachers.male6,    // Shafee Sir - Mathematics
  '7': images.teachers.male7,    // Dr. Abul Vaish Sir - Commerce
  '8': images.teachers.male8,    // Saifee Sir - English
};

// Subject image mapping
export const subjectImages: Record<string, string> = {
  'Physics': images.subjects.physics,
  'Chemistry': images.subjects.chemistry,
  'Biology': images.subjects.biology,
  'Commerce': images.subjects.commerce,
  'Mathematics': images.subjects.mathematics,
  'English': images.subjects.english,
};
