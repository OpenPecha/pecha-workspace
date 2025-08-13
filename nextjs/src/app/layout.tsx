import "./globals.polyfill";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Layout from "@/components/Layout";
import {
  ServerStructuredData,
  organizationData,
} from "@/components/ServerStructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pecha-tools.com"),
  title: {
    default: "Pecha Tools - Buddhist Manuscript Digital Workspace",
    template: "%s | Pecha Tools",
  },
  description:
    "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners. Digital preservation and translation platform for ancient Tibetan Buddhist texts and Pecha manuscripts.",
  keywords: [
    "Buddhist manuscripts",
    "Pecha tools",
    "Tibetan Buddhism",
    "Digital preservation",
    "Text translation",
    "Buddhist studies",
    "Manuscript digitization",
    "AI translation",
    "Buddhist scholarship",
    "Ancient texts",
    "OCR tools",
    "Tibetan language",
    "Cultural preservation",
    "Digital humanities",
    "Religious studies",
  ],
  authors: [{ name: "Pecha Tools Team" }],
  creator: "Pecha Tools",
  publisher: "Pecha Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Education",
  classification: "Buddhist Studies, Digital Humanities, Education Technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pecha-tools.com",
    siteName: "Pecha Tools",
    title: "Pecha Tools - Buddhist Manuscript Digital Workspace",
    description:
      "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners. Digital preservation and translation platform for ancient Tibetan Buddhist texts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pecha Tools - Buddhist Manuscript Digital Workspace",
        type: "image/png",
      },
    ],
    countryName: "Global",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pecha_tools",
    creator: "@pecha_tools",
    title: "Pecha Tools - Buddhist Manuscript Digital Workspace",
    description:
      "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners",
    images: [
      {
        url: "/og-image.png",
        alt: "Pecha Tools - Buddhist Manuscript Digital Workspace",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icon_logo.png", sizes: "32x32", type: "image/png" },
      { url: "/icon_logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icon_logo.png",
    apple: [{ url: "/icon_logo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  alternates: {
    canonical: "https://pecha-tools.com",
    languages: {
      "en-US": "https://pecha-tools.com",
    },
  },
  other: {
    "theme-color": "#12dfec",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Pecha Tools",
    "application-name": "Pecha Tools",
    "msapplication-TileColor": "#12dfec",
    "msapplication-config": "/browserconfig.xml",
    referrer: "origin-when-cross-origin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <ServerStructuredData data={organizationData} />
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/icon_logo.png"
          as="image"
          type="image/png"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//live.staticflickr.com" />
        <link rel="dns-prefetch" href="//cdn.auth0.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
