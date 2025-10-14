import { db } from '@/lib/prisma';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ToolsSection from '@/components/ToolsSection';
import VisionSection from '@/components/VisionSection';
import type { Tool, TransformedTool,  OldTool } from '@/types/Tools';
import { getSession } from '@auth0/nextjs-auth0';

export const dynamic = 'force-dynamic';

export const getUrl=async (url: string|undefined,email: string)=> {
  if(url) return url;
  try {
    const res = await fetch(`https://stt.pecha.tools/api/mapping/${email}`);
    const mappedUrl = await res.json();
    if(mappedUrl.error){
      return mappedUrl.error
    }
    return mappedUrl;
  } catch (err) {
    console.error('Error fetching mapping:', err);
    return undefined;
  }
}



async function getData() {
  const session = await getSession();
  const userInfo = session?.user;
  try {
    // Get tools data
    const tools = await db.tools.findMany();
    const rawOldTools = await db.oldTools.findMany({
      where: {
        active: true
      }
    });
 
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


     const oldTools = await Promise.all(
        rawOldTools
          ?.map(async (tool: OldTool) => {
            let path = tool.url || undefined;
            // If department exists and user email is available, update path with mapping API response
            if ( !tool.url && tool.department && userInfo?.email) {
              try {
               const mappedUrl = await getUrl(path,userInfo.email);
              path = mappedUrl;
              } catch (err) {
                // Do nothing on error, keep original path
              }
            }else if(tool.url && userInfo?.email){
              path = tool.url+"?"+`session=${encodeURIComponent(userInfo.email)}`;
            }else {
              path= undefined;
            }
            return {
              id: tool.id,
              title: tool.name ? tool.name.replaceAll("_", " ") : "",
              name: tool.name,
              description: tool.description || undefined,
              path,
              icon: tool.icon || undefined,
              demo: tool.demo || undefined,
              department: tool.department,
            };
          }) || []
         )   || [];
      
   console.log(oldTools)

    return {
      tools: transformedTools,
      oldTools,
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
