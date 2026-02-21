import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse all courses at Mirza Study Centre — Physics, Chemistry, Biology, Mathematics, Commerce & English for Class 6-12 and BSc. CBSE, ICSE & U.P. Board.",
  openGraph: {
    title: "Courses — Mirza Study Centre",
    description:
      "Physics, Chemistry, Biology, Mathematics, Commerce & English coaching for Class 6-12 and BSc.",
  },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
