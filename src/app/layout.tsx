import type { Metadata } from 'next';
import { DEFAULT_SEO_METADATA } from '@/lib/seoMetadata';
import ClientWrapper from '@/components/ClientWrapper';
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';


export const metadata: Metadata = {
  title: DEFAULT_SEO_METADATA.title,
  description: DEFAULT_SEO_METADATA.description,
  keywords: DEFAULT_SEO_METADATA.keywords,
  openGraph: {
    title: DEFAULT_SEO_METADATA.openGraph.title,
    description: DEFAULT_SEO_METADATA.openGraph.description,
    url: DEFAULT_SEO_METADATA.openGraph.url,
    siteName: DEFAULT_SEO_METADATA.openGraph.siteName,
    images: [
      {
        url: DEFAULT_SEO_METADATA.openGraph.image,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_SEO_METADATA.twitter.title,
    description: DEFAULT_SEO_METADATA.twitter.description,
    images: [DEFAULT_SEO_METADATA.twitter.image],
    site: DEFAULT_SEO_METADATA.twitter.site,
  },
  icons: {
    icon: '/icon_logo.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(DEFAULT_SEO_METADATA.structuredData),
          }}
        />
      </head>
      <body>
        <UserProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </UserProvider>
      </body>
    </html>
  )
}
