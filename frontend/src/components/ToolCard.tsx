import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface ToolCardProps {
  title: string;
  icon: string;
  path: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon, path }) => {
  const { isAuthenticated } = useAuth();

  return (
    <a
      href={isAuthenticated ? path : "/login"}
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
