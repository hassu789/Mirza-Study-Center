import { NextResponse } from 'next/server';
import { courses } from '@/data/courses';

// ============================================
// GET /api/courses/[id]
// Fetch a single course by ID
// ============================================

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the course ID from URL params
    const { id } = await params;

    // Find the course
    const course = courses.find((c) => c.id === id);

    // If course not found
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Find related courses (same category, excluding current)
    const relatedCourses = courses
      .filter((c) => c.category === course.category && c.id !== id)
      .slice(0, 3);

    // Return course with related courses
    return NextResponse.json({
      success: true,
      course: course,
      relatedCourses: relatedCourses,
    });

  } catch (error: unknown) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}
