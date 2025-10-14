import { db } from '@/lib/prisma';
import { MetadataRoute } from 'next';


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
            url: `${path}`,
            lastModified: new Date(),
        };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;



  return toolUrls;
}
