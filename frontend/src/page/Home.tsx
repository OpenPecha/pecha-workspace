import React from "react";
import ToolCard from "@/components/ToolCard";
import { useQuery } from "@tanstack/react-query";
import { getTools, Tool } from "@/api/tools";
import { useUmamiTracking, getUserContext } from "@/hooks/use-umami-tracking";
import { useAuth } from "@/contexts/AuthContext";

interface TransformedTool {
  id?: string;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  path?: string;
  price?: number;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const { trackToolListViewed } = useUmamiTracking({ userEmail: user?.email });

  const { data: toolsList, isLoading } = useQuery({
    queryKey: ["toolsList"],
    queryFn: () => getTools(),
  });

  const tools = toolsList?.map((tool: Tool) => ({
    id: tool.id,
    title: tool.name,
    description: tool.description,
    category: tool.category,
    icon: tool.icon,
    path: tool.link,
    price: tool.price,
  }));

  // Track tool list viewed when tools are loaded
  React.useEffect(() => {
    if (tools && tools.length > 0) {
      trackToolListViewed(tools.length, {
        ...getUserContext(user),
        metadata: {
          page: "home",
          tools_loaded: true,
        },
      });
    }
  }, [tools, trackToolListViewed, user]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <section className="text-center mb-16 space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-pecha-primary">pecha</span>
          <span className="text-pecha-secondary">.tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A centralized hub for working with Bhuddhist manuscripts (Pecha),
          providing specialized tools for translation, transcription, and
          proofreading.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading && <div>loading</div>}
          {!isLoading &&
            tools?.map((tool: TransformedTool, index: number) => (
              <div
                key={tool.id || tool.title}
                className="animate-slide-up"
                title={tool.description}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <ToolCard
                  title={tool.title}
                  icon={tool.icon || ""}
                  path={tool.path || "#"}
                  toolId={tool.id}
                  category={tool.category}
                  description={tool.description}
                />
              </div>
            ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">About Pecha Tools</h2>
        <p className="text-gray-600 mb-4">
          Pecha.tools is a specialized platform designed for scholars,
          researchers, and practitioners working with Bhuddhist manuscripts. Our
          suite of tools helps streamline the process of translating,
          transcribing, and proofreading these valuable cultural artifacts.
        </p>
        <p className="text-gray-600">
          With a centralized login system, users can seamlessly access all tools
          and maintain consistency across their projects. Our modern, intuitive
          interface ensures that users can focus on their work rather than
          navigating complex software.
        </p>
      </section>
    </div>
  );
};

export default Home;
