import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
<<<<<<< HEAD
import "./globals.css";

=======
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mirzastudycentre.com";

>>>>>>> fffd24c (admin account)
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mirza Study Centre - Best Coaching in Azamgarh",
    template: "%s | Mirza Study Centre",
  },
  description:
    "Mirza Study Centre offers expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce. Located beside Shibli Inter College, Pandey Bazar, Azamgarh.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Mirza Study Centre - Best Coaching in Azamgarh",
    description:
      "Expert coaching for Class 6-12 & BSc in Physics, Chemistry, Biology, Mathematics, English & Commerce. Beside Shibli Inter College, Pandey Bazar, Azamgarh.",
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
  telephone: ["+919670212323", "+918957205460", "+919335869519"],
  email: "info@mirzastudycentre.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beside Shibli Inter College, Pandey Bazar",
    addressLocality: "Azamgarh",
    addressRegion: "Uttar Pradesh",
    postalCode: "276001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.0685,
    longitude: 83.185,
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
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
