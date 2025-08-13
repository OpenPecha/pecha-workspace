import { MetadataRoute } from "next";
import { getTools } from "@/api/tools";

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
  ];

  // Dynamic pages - tools
  let toolPages: MetadataRoute.Sitemap = [];
  try {
    const tools = await getTools();
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
  }

  return [...staticPages, ...toolPages];
}

