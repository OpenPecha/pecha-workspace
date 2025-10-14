export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
    site: string;
  };
  structuredData?: any;
}

// Core keywords for the Buddhist AI platform
export const CORE_KEYWORDS = [
  'AI Buddhist',
  'Pecha Tibetan text',
  'Buddhist manuscripts',
  'Tibetan language tools',
  'Buddhist text translation',
  'AI-powered Buddhist tools',
  'Pecha digitization',
  'Buddhist scripture preservation',
  'Tibetan Buddhist texts',
  'Ancient Buddhist manuscripts',
  'Buddhist literature translation',
  'Dharma text processing',
  'Buddhist AI tools',
  'Tibetan text analysis',
  'Buddhist manuscript digitization',
  'Pecha text recognition',
  'Buddhist heritage preservation',
  'Tibetan script processing',
  'Buddhist text analytics',
  'Traditional Buddhist texts',
  'Buddhist wisdom preservation',
  'Tibetan OCR',
  'Buddhist text mining',
  'Dharma digitization',
  'Buddhist language processing'
];

// Base site information
export const SITE_INFO = {
  name: 'Buddhist AI Studio',
  url: 'https://studio.pecha.ai',
  description: 'A comprehensive collection of AI tools for modern Buddhist text collection, translation, and preservation. Specialized platform for Pecha Tibetan manuscripts, ancient Buddhist scriptures, and Dharma text processing.',
  logo: '/icon_logo.png',
  twitterHandle: '@pechatools'
};

// Default metadata for the homepage
export const DEFAULT_SEO_METADATA: SEOMetadata = {
  title: `${SITE_INFO.name} - AI Tools for Buddhist Text Collection & Translation`,
  description: SITE_INFO.description,
  keywords: CORE_KEYWORDS,
  openGraph: {
    title: `${SITE_INFO.name} - AI Tools for Buddhist Text Collection & Translation`,
    description: SITE_INFO.description,
    image: `${SITE_INFO.url}/og-image.png`,
    url: SITE_INFO.url,
    type: 'website',
    siteName: SITE_INFO.name
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_INFO.name} - AI Tools for Buddhist Text Collection & Translation`,
    description: SITE_INFO.description,
    image: `${SITE_INFO.url}/og-image.png`,
    site: SITE_INFO.twitterHandle
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_INFO.name,
    "url": SITE_INFO.url,
    "description": SITE_INFO.description,
    "applicationCategory": "Educational Software",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Buddhist AI Studio",
      "url": SITE_INFO.url
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Buddhist Manuscripts"
      },
      {
        "@type": "Thing", 
        "name": "Tibetan Language"
      },
      {
        "@type": "Thing",
        "name": "AI Translation Tools"
      },
      {
        "@type": "Thing",
        "name": "Digital Preservation"
      }
    ]
  }
};

// Page-specific metadata generator
export const generatePageMetadata = (
  title: string,
  description: string,
  additionalKeywords: string[] = [],
  path: string = ''
): SEOMetadata => {
  const fullTitle = title.includes(SITE_INFO.name) ? title : `${title} | ${SITE_INFO.name}`;
  const pageUrl = `${SITE_INFO.url}${path}`;
  
  return {
    title: fullTitle,
    description,
    keywords: [...CORE_KEYWORDS, ...additionalKeywords],
    openGraph: {
      title: fullTitle,
      description,
      image: `${SITE_INFO.url}/og-image.png`,
      url: pageUrl,
      type: 'website',
      siteName: SITE_INFO.name
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      image: `${SITE_INFO.url}/og-image.png`,
      site: SITE_INFO.twitterHandle
    }
  };
};

// Tool-specific metadata generator
export const generateToolMetadata = (
  toolName: string,
  toolDescription: string,
  toolKeywords: string[] = []
): SEOMetadata => {
  return generatePageMetadata(
    `${toolName} - Buddhist AI Tool`,
    `${toolDescription} Specialized AI tool for Buddhist manuscript processing and Pecha text analysis.`,
    [...toolKeywords, 'Buddhist AI tool', 'Pecha processing', 'Tibetan text tool'],
    `/tools/${toolName.toLowerCase().replace(/\s+/g, '-')}`
  );
};

