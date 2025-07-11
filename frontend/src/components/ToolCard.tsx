import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useUmamiTracking, getUserContext } from "@/hooks/use-umami-tracking";

interface ToolCardProps {
  title: string;
  icon: string;
  path: string;
  toolId?: string;
  category?: string;
  description?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  icon,
  path,
  toolId,
  category,
  description,
}) => {
  const { isAuthenticated, user } = useAuth();
  const { trackToolClicked } = useUmamiTracking();

  const handleToolClick = () => {
    // Track tool click event
    trackToolClicked(
      toolId || title.toLowerCase().replace(/\s+/g, "-"),
      title,
      category,
      path,
      {
        ...getUserContext(user),
        metadata: {
          is_authenticated: isAuthenticated,
          redirected_to_login: !isAuthenticated,
          tool_description: description || null,
        },
      }
    );
  };

  return (
    <a
      href={isAuthenticated ? path : "/login"}
      onClick={handleToolClick}
      className={cn("block transition-transform duration-300 hover:scale-105")}
    >
      <Card>
        <CardHeader>
          <CardTitle className={`rounded-full p-3 text-center w-fit mx-auto`}>
            <img src={icon} alt={title} className="max-h-12" />
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="text-center">
          <h3 className="font-bold text-lg mt-2 text-gray-600">{title}</h3>
        </CardContent>
      </Card>
    </a>
  );
};

export default ToolCard;
