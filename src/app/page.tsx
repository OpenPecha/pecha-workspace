import { db } from '@/lib/prisma';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ToolsSection from '@/components/ToolsSection';
import VisionSection from '@/components/VisionSection';
import type { Tool, TransformedTool, TransformedOldTool } from '@/types/Tools';

async function getData() {
  try {
    // Get tools data
    const tools = await db.tools.findMany();
    const rawOldTools = await db.oldTools.findMany({
      where: {
        active: true
      }
    });

    // Transform old tools for non-authenticated users
    const modifiedRawOldTools: TransformedOldTool[] = rawOldTools.map((tool) => ({
      id: tool.id,
      title: tool.name ? tool.name.replaceAll("_", " ") : "",
      name: tool.name,
      description: tool.description || undefined,
      path: undefined,
      icon: tool.icon || undefined,
      demo: tool.demo || undefined,
      department: tool.department,
    }));

    // Transform new tools data
    const transformedTools: TransformedTool[] = tools
      .map((tool: Tool): TransformedTool => ({
        id: tool.id,
        title: tool.name?.split("-")[0] || tool.name || "Untitled Tool",
        description: tool.description || undefined,
        category: tool.category || "",
        icon: tool.icon || undefined,
        path: tool.link || tool.demo || "#",
        price: tool.price || undefined,
        demo: tool.demo || undefined,
        status: (() => {
          if (tool.name && tool.name.split("-").length > 1) {
            return tool.name.split("-").pop() || "Available";
          }
          return "Available";
        })(),
      }))
      .sort((a: TransformedTool, b: TransformedTool) => {
        // Sort tools so "Coming Soon" appears at the end
        const aIsComingSoon = a.status.toLowerCase().includes("coming soon");
        const bIsComingSoon = b.status.toLowerCase().includes("coming soon");

        if (aIsComingSoon && !bIsComingSoon) return 1;
        if (!aIsComingSoon && bIsComingSoon) return -1;

        return 0;
      });

    return {
      tools: transformedTools,
      oldTools: modifiedRawOldTools,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      tools: [],
      oldTools: [],
    };
  }
}

export default async function Home() {
  const { tools, oldTools } = await getData();

  return (
    <Layout>
      <div className="pt-0 ">
        <Hero />
        <ToolsSection tools={tools} oldTools={oldTools} />
        <VisionSection />
      </div>

    </Layout>
  );
}
