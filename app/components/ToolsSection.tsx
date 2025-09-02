import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <div className="group relative h-full">
      {/* Modern floating container */}
      <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/40 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden">
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        
        {/* Status indicator */}
        {status !== "Available" && (
          <div className="absolute top-1 right-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
            Coming Soon
          </div>
        )}
        
        {/* Icon and title section */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {icon ? (
                  <img src={icon} alt={title} className="h-6 w-6" />
                ) : (
                  <Sparkles className="h-6 w-6 text-primary" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              {category && (
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="relative z-10 flex-1 mb-6">
            <p className="text-gray-600 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        )}

        {/* Modern button */}
        <div className="relative z-10 mt-auto">
          <button
            onClick={handleToolClick}
            disabled={isDisabled}
            className="w-full cursor-pointer group/btn relative overflow-hidden bg-white/80 hover:bg-primary disabled:bg-gray-100 disabled:cursor-not-allowed border border-gray-200 hover:border-primary/50 disabled:border-gray-200 rounded-2xl px-6 py-3 text-sm font-medium text-gray-700 hover:text-white disabled:text-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="relative z-10">
              {getButtonText()}
            </span>
            {!isDisabled && (
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
            )}
            
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
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
      category: tool.category || "",
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
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollFadeIn direction="up" delay={0} triggerOnce={true}>
          <header className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Our Digital Suite
            </div>
            <h2
              id="tools-heading"
              className="text-5xl bg-gradient-to-r leading-normal from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6"
            >
              Digital Tools for Buddhist Studies
            </h2>
           
          </header>
        </ScrollFadeIn>

        {/* Modern tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <div className="col-span-full text-center py-16">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/40 shadow-sm max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600">
                  Our tools are being prepared for launch.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Check back later for exciting updates!
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
