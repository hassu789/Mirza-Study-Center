import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Mirza Study Centre — fees, timings, subjects, batches, admission process and more.",
  openGraph: {
    title: "FAQ — Mirza Study Centre",
    description:
      "Get answers about fees, timings, subjects, batches, and admission at Mirza Study Centre.",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
