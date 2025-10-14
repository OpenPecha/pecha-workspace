import { db } from '@/lib/prisma';
import { MetadataRoute } from 'next';

const URL = 'https://buddhistai.tools';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await db.tools.findMany({
    select: {
      link: true,
      demo: true,
      name: true,
    },
  });

  const toolUrls = tools
    .map(tool => {
        const path = tool.link || tool.demo;
        const status = tool.name?.split("-").pop() || "Available";
        const isComingSoon = status.toLowerCase().includes("coming soon");
        
        if (!path || path === '#' || isComingSoon) {
            return null;
        }

        return {
            url: `${URL}${path}`,
            lastModified: new Date(),
        };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  const staticToolUrls = [
    'https://translation.buddhistai.tools',
    'https://arena.buddhistai.tools',
    'https://cataloger.buddhistai.tools',
  ].map(url => ({
    url,
    lastModified: new Date(),
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
    },
    ...toolUrls,
    ...staticToolUrls,
  ];
}
