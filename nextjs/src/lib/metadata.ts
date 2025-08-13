import { Metadata } from "next";

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  canonical,
  noindex = false,
}: PageMetadata): Metadata {
  const baseUrl = "https://pecha-tools.com";

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "Buddhist manuscripts",
      "Pecha tools",
      "Tibetan Buddhism",
      "Digital preservation",
    ],
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      title,
      description,
      url: canonical || baseUrl,
      siteName: "Pecha Tools",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: canonical || baseUrl,
    },
  };
}

export const homeMetadata = generatePageMetadata({
  title: "Home",
  description:
    "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners. Digital preservation and translation platform for ancient Tibetan Buddhist texts and Pecha manuscripts.",
  keywords: [
    "Buddhist scholarship",
    "Manuscript digitization",
    "AI translation",
    "Ancient texts",
    "Text analysis",
    "OCR tools",
    "Tibetan language",
    "Cultural preservation",
  ],
  canonical: "https://pecha-tools.com",
});

export const profileMetadata = generatePageMetadata({
  title: "User Profile",
  description: "Manage your Pecha Tools account and profile settings.",
  keywords: ["user profile", "account settings", "Buddhist scholar"],
  noindex: true, // User profile pages should not be indexed
});

export const adminMetadata = generatePageMetadata({
  title: "Admin Dashboard",
  description: "Administrative dashboard for managing Pecha Tools platform.",
  keywords: ["admin", "dashboard", "management"],
  noindex: true, // Admin pages should not be indexed
});
