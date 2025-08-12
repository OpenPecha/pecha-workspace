"use client";

import { useQuery } from "@tanstack/react-query";
import { getTools, Tool } from "@/api/tools";
import ToolCard from "@/components/ToolCard";
import { useUmamiTracking, getUserContext } from "@/hooks/use-umami-tracking";
import { useAuth } from "@/contexts/AuthContext";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import React from "react";

interface TransformedTool {
  id?: string;
  title: string;
  description?: string;
  category: string;
  icon?: string;
  path?: string;
  price?: number;
  status: string;
  demo?: string;
}

const ToolsSection = () => {
  const { user } = useAuth();
  const { trackToolListViewed } = useUmamiTracking({
    userEmail: user?.email || undefined,
  });

  // Fetch tools from API
  const { data: toolsList, isLoading } = useQuery({
    queryKey: ["toolsList"],
    queryFn: () => getTools(),
  });
  const tools: TransformedTool[] =
    toolsList
      ?.map((tool: Tool) => ({
        id: tool.id,
        title: tool.name?.split("-")[0] || tool.name || "Untitled Tool", // API uses 'name' field
        description: tool.description,
        category: tool.category || "General", // Default category if empty
        icon: tool.icon, // Base64 encoded icon data
        path: tool.link, // API uses 'link' field
        price: tool.price,
        demo: tool.demo,
        status:
          tool.name && tool.name.split("-").length > 1
            ? tool.name.split("-").pop() || "Available"
            : "Available",
        //default status for API tools
      }))
      .sort((a, b) => {
        // Sort tools so "Coming Soon" appears at the end
        const aIsComingSoon = a.status.toLowerCase().includes("coming soon");
        const bIsComingSoon = b.status.toLowerCase().includes("coming soon");

        if (aIsComingSoon && !bIsComingSoon) return 1; // a goes after b
        if (!aIsComingSoon && bIsComingSoon) return -1; // a goes before b

        // If both have same coming soon status, maintain original order
        return 0;
      }) || [];

  // Track tool list viewed when tools are loaded
  React.useEffect(() => {
    if (tools && tools.length > 0) {
      trackToolListViewed(tools.length, {
        ...getUserContext(user),
        metadata: {
          page: "home_tools_section",
          tools_count: tools.length,
          tools_loaded: true,
          has_categories: tools.some(
            (tool) => tool.category && tool.category !== "General"
          ),
          has_demos: tools.some((tool) => tool.demo && tool.demo.trim() !== ""),
          has_pricing: tools.some((tool) => tool.price && tool.price > 0),
        },
      });
    }
  }, [tools, trackToolListViewed, user]);

  return (
    <section
      id="tools"
      className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100"
    >
      <div className="container mx-auto px-4">
        <ScrollFadeIn direction="up" delay={0} triggerOnce={true}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Digital Tools for Buddhist Studies
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Discover our comprehensive suite of tools designed to support
              scholars, translators, and practitioners in their study and
              preservation of Buddhist texts.
            </p>
          </div>
        </ScrollFadeIn>

        {/* Tools from API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading && (
            <div className="col-span-full text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-muted-foreground">Loading tools...</p>
            </div>
          )}
          {!isLoading && tools && tools.length > 0 ? (
            tools.map((tool, index: number) => {
              return (
                <ScrollFadeIn
                  key={tool.id || tool.title}
                  direction="up"
                  delay={index * 100}
                  threshold={0.1}
                  triggerOnce={false}
                >
                  <ToolCard
                    title={tool.title}
                    icon={tool.icon || ""}
                    path={tool.path || "#"}
                    toolId={tool.id}
                    category={tool.category}
                    description={tool.description}
                    status={tool.status}
                    price={tool.price}
                  />
                </ScrollFadeIn>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              {!isLoading && (!tools || tools.length === 0) && (
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    No tools available at the moment.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check back later or contact an administrator to add tools.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
