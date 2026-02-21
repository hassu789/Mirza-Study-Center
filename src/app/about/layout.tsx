import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mirza Study Centre — 10+ years of academic excellence in Azamgarh. Expert coaching for Class 6-12 & BSc with 8+ experienced teachers and 5000+ successful students.",
  openGraph: {
    title: "About Us — Mirza Study Centre",
    description:
      "10+ years of academic excellence in Azamgarh. 8+ expert teachers, 5000+ students, 95% results.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
