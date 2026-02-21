import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire Now",
  description:
    "Contact Mirza Study Centre for admission inquiries. Fill the form or call us at +91 96702 12323. Located beside Shibli Inter College, Pandey Bazar, Azamgarh.",
  openGraph: {
    title: "Enquire Now — Mirza Study Centre",
    description:
      "Fill the inquiry form or call +91 96702 12323. We respond within 24 hours.",
  },
};

export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
