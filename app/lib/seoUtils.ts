/**
 * SEO Utility functions for Pecha.tools Buddhist AI Platform
 * These utilities help generate dynamic SEO content and structured data
 */

import { CORE_KEYWORDS, SITE_INFO } from './seoMetadata';

/**
 * Generate keyword-rich URL slug from text
 */
export const generateSEOSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Generate meta description with keyword optimization
 */
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const keywords = ['Buddhist AI', 'Pecha texts', 'Tibetan manuscripts'];
  let description = content.slice(0, maxLength - 30); // Leave room for keywords
  
  // Add relevant keywords if not present
  const keywordString = keywords.find(keyword => 
    !description.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (keywordString && description.length + keywordString.length < maxLength) {
    description += ` | ${keywordString}`;
  }
  
  return description.slice(0, maxLength);
};

/**
 * Generate FAQ schema for Buddhist content
 */
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generate Article schema for blog posts or content pages
 */
export const generateArticleSchema = (
  title: string,
  description: string,
  author: string = 'Pecha.tools',
  publishDate: string = new Date().toISOString()
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": SITE_INFO.url
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_INFO.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_INFO.url}/icon_logo.png`
      }
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": SITE_INFO.url
    },
    "image": `${SITE_INFO.url}/og-image.png`,
    "keywords": CORE_KEYWORDS.slice(0, 10).join(', ')
  };
};

/**
 * Generate Organization schema for about pages
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_INFO.name,
    "url": SITE_INFO.url,
    "logo": `${SITE_INFO.url}/icon_logo.png`,
    "description": SITE_INFO.description,
    "foundingDate": "2024",
    "founder": {
      "@type": "Organization",
      "name": "Pecha.tools Team"
    },
    "area_served": "Global",
    "audience": {
      "@type": "Audience",
      "audienceType": "Buddhist practitioners, researchers, translators, digital preservation specialists"
    },
    "knowsAbout": [
      "Buddhist manuscripts",
      "Tibetan language processing", 
      "AI translation",
      "Digital preservation",
      "Pecha texts",
      "Buddhist literature"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": SITE_INFO.url,
      "availableLanguage": ["English", "Tibetan"]
    }
  };
};

/**
 * Generate SoftwareApplication schema for the platform
 */
export const generateSoftwareSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": SITE_INFO.name,
    "url": SITE_INFO.url,
    "description": SITE_INFO.description,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization", 
      "name": "Pecha.tools"
    },
    "screenshot": `${SITE_INFO.url}/og-image.png`,
    "softwareVersion": "1.0",
    "releaseNotes": "Initial release of Buddhist AI platform",
    "requirements": "Modern web browser with JavaScript enabled",
    "installUrl": SITE_INFO.url,
    "downloadUrl": SITE_INFO.url,
    "supportingData": {
      "@type": "DataFeed",
      "description": "Buddhist manuscripts and Pecha texts"
    }
  };
};
