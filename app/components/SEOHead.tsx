import { SEOMetadata } from '../lib/seoMetadata';

interface SEOHeadProps {
  metadata: SEOMetadata;
}

/**
 * Reusable SEO component for adding structured data and meta tags
 * This component can be used in any route to add dynamic SEO data
 */
export const SEOHead = ({ metadata }: SEOHeadProps) => {
  return (
    <>
      {/* JSON-LD Structured Data */}
      {metadata.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metadata.structuredData)
          }}
        />
      )}
      
      {/* Additional Open Graph tags for better social sharing */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Pecha.tools - Buddhist AI Platform Logo" />
      
      {/* Additional Twitter tags */}
      <meta name="twitter:image:alt" content="Pecha.tools - Buddhist AI Platform Logo" />
      
      {/* Geo and location tags for Buddhist content */}
      <meta name="geo.region" content="Global" />
      <meta name="geo.placename" content="Dharamshala, Tibet, India" />
      
      {/* Language and content tags */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="content-language" content="en" />
      
      {/* Buddhist/Religious content classification */}
      <meta name="classification" content="Education, Religion, Technology" />
      <meta name="category" content="Buddhist Studies, AI Tools, Digital Preservation" />
      
      {/* Copyright and ownership */}
      <meta name="copyright" content="Pecha.tools 2024" />
      <meta name="owner" content="Pecha.tools" />
    </>
  );
};

export default SEOHead;
