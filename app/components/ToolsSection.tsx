import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 h-full flex flex-col bg-card">
      <CardHeader>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 duration-300 shrink-0">
            {icon ? (
              <img src={icon} alt={title} className="h-5 w-5 text-primary-foreground" />
            ) : (
              <div className="h-5 w-5 bg-primary-foreground/20 rounded" />
            )}
          </div>
          <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        {description && (
          <p className="text-muted-foreground mb-6 leading-relaxed flex-1 text-sm">
            {description}
          </p>
        )}

        <Button
          onClick={handleToolClick}
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
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
  const rawTools = loaderData?.tools || [];

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
      className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"
      aria-labelledby="tools-heading"
    >
      <div className="container mx-auto px-4">
        <ScrollFadeIn direction="up" delay={0} triggerOnce={true}>
          <header className="text-center mb-16">
            <h2
              id="tools-heading"
              className="text-4xl font-bold text-foreground mb-4"
            >
              Digital Tools for Buddhist Studies
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                <p className="text-muted-foreground">
                  No tools available at the moment.
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2">
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
