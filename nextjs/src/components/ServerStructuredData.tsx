// Server-side structured data component
interface StructuredDataProps {
  data: object;
}

export function ServerStructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
}

// Organization structured data
export const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pecha Tools",
  description:
    "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners",
  url: "https://pecha-tools.com",
  logo: {
    "@type": "ImageObject",
    url: "https://pecha-tools.com/icon_logo.png",
    width: 512,
    height: 512,
  },
  image: "https://pecha-tools.com/og-image.png",
  foundingDate: "2024",
  knowsAbout: [
    "Buddhist Manuscripts",
    "Tibetan Buddhism",
    "Digital Preservation",
    "Text Translation",
    "AI Translation",
    "Buddhist Studies",
    "Ancient Texts",
    "Pecha Manuscripts",
  ],
  sameAs: ["https://twitter.com/pecha_tools", "https://github.com/pecha-tools"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "support@pecha-tools.com",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Digital Preservation",
    "Text Translation",
    "Manuscript Digitization",
    "AI-Powered Translation",
    "Buddhist Scholarship Tools",
  ],
};

// Website structured data
export const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pecha Tools",
  url: "https://pecha-tools.com",
  description:
    "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  creator: {
    "@type": "Organization",
    name: "Pecha Tools",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://pecha-tools.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Buddhist Manuscript Tools",
    description:
      "Collection of AI-powered tools for Buddhist manuscript processing",
    numberOfItems: 8,
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        name: "Pecha OCR",
        description: "AI-powered OCR for Buddhist manuscripts",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
      },
      {
        "@type": "SoftwareApplication",
        name: "Pecha Translator",
        description: "AI translation tool for Tibetan Buddhist texts",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
      },
      {
        "@type": "SoftwareApplication",
        name: "Text Alignment",
        description: "Align parallel Buddhist texts for comparison",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web Browser",
      },
    ],
  },
};

// Web Application structured data
export const webApplicationData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pecha Tools",
  description:
    "AI-Enhanced Buddhist Manuscript Tools for scholars, translators, and practitioners",
  url: "https://pecha-tools.com",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  creator: {
    "@type": "Organization",
    name: "Pecha Tools",
  },
  screenshot: "https://pecha-tools.com/og-image.png",
  softwareVersion: "1.0",
  releaseNotes: "Initial release of Buddhist manuscript tools platform",
};
