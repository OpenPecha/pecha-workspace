import React from "react";
ADS;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUmamiTracking, getUserContext } from "@/hooks/use-umami-tracking";

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
  const { isAuthenticated, user } = useAuth();
  const { trackToolClicked } = useUmamiTracking({ userEmail: user?.email });

  const handleToolClick = async () => {
    // Track tool click event first and wait for it to complete
    await trackToolClicked(
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
          tool_status: status,
          tool_price: price || null,
        },
      }
    );

    // Then redirect to the appropriate URL after tracking is done
    const redirectUrl = isAuthenticated ? path : "/login";
    window.location.href = redirectUrl;
  };
  const isDisabled = status !== "Available";

  // Simple test version first

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 h-full flex flex-col">
      <CardHeader className="">
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
        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        {description && (
          <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
            {description}
          </p>
        )}

        <Button
          onClick={handleToolClick}
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          disabled={isDisabled}
        >
          {isDisabled
            ? "Coming Soon"
            : isAuthenticated
            ? "Access Tool"
            : "Login to Access"}
          {!isDisabled && <ExternalLink className="ml-2 h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
