import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what students and parents say about Mirza Study Centre. Real success stories and reviews from our 5000+ students in Azamgarh.",
  openGraph: {
    title: "Student Testimonials — Mirza Study Centre",
    description:
      "Real success stories from 5000+ students. See why parents trust Mirza Study Centre.",
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
