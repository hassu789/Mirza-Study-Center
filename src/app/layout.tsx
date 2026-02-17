import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
