"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface StructuredDataProps {
  type?: "organization" | "website" | "tools";
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type = "organization",
}) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server to avoid hydration issues
  if (!isClient) {
    return null;
  }

  const getOrganizationData = () => ({
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
    sameAs: [
      "https://twitter.com/pecha_tools",
      "https://github.com/pecha-tools",
    ],
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
  });

  const getWebsiteData = () => ({
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
  });

  const getBreadcrumbData = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pecha-tools.com",
      },
    ];

    pathSegments.forEach((segment, index) => {
      const position = index + 2;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      const item = `https://pecha-tools.com/${pathSegments
        .slice(0, index + 1)
        .join("/")}`;

      breadcrumbItems.push({
        "@type": "ListItem",
        position,
        name,
        item,
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    };
  };

  const getStructuredData = () => {
    const data = [];

    if (type === "organization") {
      data.push(getOrganizationData());
    }

    if (type === "website") {
      data.push(getWebsiteData());
    }

    // Always include breadcrumbs if not on home page
    if (pathname !== "/") {
      data.push(getBreadcrumbData());
    }

    return data;
  };

  const structuredData = getStructuredData();

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 2),
          }}
        />
      ))}
    </>
  );
};

export default StructuredData;
