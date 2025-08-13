"use client";

import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Pecha Tools - Buddhist Manuscript Digital Workspace",
  description = "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners",
  keywords = [],
  canonical,
  noindex = false,
  children,
}) => {
  const defaultKeywords = [
    "Buddhist manuscripts",
    "Pecha tools",
    "Tibetan Buddhism",
    "Digital preservation",
    "Text translation",
    "Buddhist studies",
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(", ");

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />

      {canonical && <link rel="canonical" href={canonical} />}

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="//googleapis.com" />

      {/* Structured data for local business (if applicable) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Pecha Tools",
            description: description,
            url: "https://pecha-tools.com",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            creator: {
              "@type": "Organization",
              name: "Pecha Tools",
            },
          }),
        }}
      />

      {children}
    </Head>
  );
};

export default SEOHead;
