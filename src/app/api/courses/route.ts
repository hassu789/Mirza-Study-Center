import { NextResponse } from 'next/server';
import { courses, categories, levels } from '@/data/courses';

// ============================================
// GET /api/courses
// Fetch all courses with optional filtering
// ============================================
// Query params:
//   - category: Filter by subject (Physics, Chemistry, etc.)
//   - level: Filter by level (Class 9-10, BSc, etc.)
//   - search: Search in title and description
// ============================================

export async function GET(request: Request) {
  try {
    // Get query parameters from URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    // Start with all courses
    let filteredCourses = [...courses];

    // Filter by category if provided
    if (category && category !== 'All') {
      filteredCourses = filteredCourses.filter(
        (course) => course.category === category
      );
    }

    // Filter by level if provided
    if (level && level !== 'All') {
      filteredCourses = filteredCourses.filter(
        (course) => course.level === level
      );
    }

    // Filter by search query if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.instructor.toLowerCase().includes(searchLower)
      );
    }

    // Return filtered courses
    return NextResponse.json({
      success: true,
      count: filteredCourses.length,
      total: courses.length,
      categories: categories,
      levels: levels,
      courses: filteredCourses,
    });

  } catch (error: unknown) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
