import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pecha-tools.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/api/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Dynamic pages - tools
  let toolPages: MetadataRoute.Sitemap = [];
  try {
    // Use Prisma directly instead of API call during build
    const tools = await prisma.tools.findMany({
      select: {
        id: true,
        link: true,
      },
    });

    toolPages = tools
      .filter((tool) => tool.link && !tool.link.includes("coming-soon"))
      .map((tool) => ({
        url: `${baseUrl}/tools/${tool.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch (error) {
    console.error("Error fetching tools for sitemap:", error);
    // Continue without tool pages if database is not available during build
  }

  return [...staticPages, ...toolPages];
}
