import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ToastProvider } from "@/components/Toast";
import { contact } from "@/data/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mirzastudycentre.com";


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mirza Study Centre - Best Coaching in Azamgarh",
    template: "%s | Mirza Study Centre",
  },
  description:
    "Mirza Study Centre offers expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce. Located in Arazibag, Azamgarh.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Mirza Study Centre - Best Coaching in Azamgarh",
    description:
      "Expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce. Arazibag, Azamgarh.",
    type: "website",
    locale: "en_IN",
    siteName: "Mirza Study Centre",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirza Study Centre - Best Coaching in Azamgarh",
    description:
      "Expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Mirza Study Centre",
  description:
    "Expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce.",
  url: siteUrl,
  telephone: contact.phones,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "35GJ+3V3, Arazibag",
    addressLocality: "Azamgarh",
    addressRegion: "Uttar Pradesh",
    postalCode: "276001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: contact.coordinates.lat,
    longitude: contact.coordinates.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "20:00",
  },
  sameAs: [],
  priceRange: "₹1,000/subject/month",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <ToastProvider>
          {children}
          <WhatsAppButton />
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
