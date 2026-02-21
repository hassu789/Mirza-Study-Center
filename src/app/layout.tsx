import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mirza Study Centre - Best Coaching in Azamgarh",
  description: "Mirza Study Centre offers expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce. Located beside Shibli Inter College, Pandey Bazar, Azamgarh.",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "Mirza Study Centre - Best Coaching in Azamgarh",
    description: "Expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce. Beside Shibli Inter College, Pandey Bazar, Azamgarh.",
    type: "website",
    locale: "en_IN",
    siteName: "Mirza Study Centre",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirza Study Centre - Best Coaching in Azamgarh",
    description: "Expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
