import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink } from "lucide-react";
import { useLoaderData } from "react-router";
import { useUserStore } from "../store/user";
import ScrollFadeIn from "./ScrollFadeIn";

interface ToolCardProps {
  title: string;
  icon: string;
  path: string;
  toolId?: string;
  category?: string;
  description?: string;
  status?: string;
  price?: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Beta":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Coming Soon":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  icon,
  path,
  toolId,
  category,
  description,
  status = "Available",
  price,
}) => {
  const { user } = useUserStore();
  const isAuthenticated = !!user;

  const handleToolClick = () => {
    // Redirect to the appropriate URL
    const redirectUrl = isAuthenticated ? path : "/auth/login";
    window.location.href = redirectUrl;
  };

  const isDisabled = status !== "Available";
  
  const getButtonText = (): string => {
    if (isDisabled) return "Coming Soon";
    return isAuthenticated ? "Access Tool" : "Login to Access";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
            {icon ? (
              <img src={icon} alt={title} className="h-6 w-6 text-white" />
            ) : (
              <div className="h-6 w-6 bg-white/20 rounded" />
            )}
          </div>
          <Badge className={getStatusColor(status) + " capitalize"}>
            {status}
          </Badge>
        </div>
        <CardTitle className="text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        {description && (
          <p className="text-gray-600 mb-6 leading-relaxed flex-1">
            {description}
          </p>
        )}

        <Button
          onClick={handleToolClick}
          variant="outline"
          className="w-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
          disabled={isDisabled}
        >
          {getButtonText()}
          {!isDisabled ? <ExternalLink className="ml-2 h-4 w-4" /> : null}
        </Button>
      </CardContent>
    </Card>
  );
};

interface TransformedTool {
  id?: string;
  title: string;
  name?: string;
  description?: string;
  category: string;
  icon?: string;
  path?: string;
  link?: string;
  price?: number;
  status: string;
  demo?: string;
}

const ToolsSection = () => {
  const loaderData = useLoaderData();
  const rawTools = (loaderData as any)?.tools || [];

  // Transform tools data to match NextJS format
  const tools: TransformedTool[] = rawTools
    ?.map((tool: any) => ({
      id: tool.id,
      title: tool.name?.split("-")[0] || tool.name || "Untitled Tool",
      description: tool.description,
      category: tool.category || "General",
      icon: tool.icon,
      path: tool.link || tool.path || "#",
      price: tool.price,
      demo: tool.demo,
      status: (() => {
        if (tool.name && tool.name.split("-").length > 1) {
          return tool.name.split("-").pop() || "Available";
        }
        return tool.status || "Available";
      })(),
    }))
    .sort((a: TransformedTool, b: TransformedTool) => {
      // Sort tools so "Coming Soon" appears at the end
      const aIsComingSoon = a.status.toLowerCase().includes("coming soon");
      const bIsComingSoon = b.status.toLowerCase().includes("coming soon");

      if (aIsComingSoon && !bIsComingSoon) return 1;
      if (!aIsComingSoon && bIsComingSoon) return -1;

      return 0;
    }) || [];

  return (
    <section
      id="tools"
      className="py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100"
      aria-labelledby="tools-heading"
    >
      <div className="container mx-auto px-4">
        <ScrollFadeIn direction="up" delay={0} triggerOnce={true}>
          <header className="text-center mb-16">
            <h2
              id="tools-heading"
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Digital Tools for Buddhist Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive suite of tools designed to support
              scholars, translators, and practitioners in their study and
              preservation of Buddhist texts.
            </p>
          </header>
        </ScrollFadeIn>

        {/* Tools from Database */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools && tools.length > 0 ? (
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
              <div className="mt-4">
                <p className="text-gray-600">
                  No tools available at the moment.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Check back later or contact an administrator to add tools.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
