import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  path: string;
  isLoggedIn?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  path,
  isLoggedIn = false,
}) => {
  return (
    <a
      href={isLoggedIn ? path : "#"}
      className={cn(
        "block transition-transform duration-300 hover:scale-105",
        !isLoggedIn && "cursor-not-allowed opacity-80"
      )}
      onClick={(e) => !isLoggedIn && e.preventDefault()}
    >
      <Card className="tool-card h-full">
        <div className={cn("tool-icon", bgColor)}>
          <Icon size={32} className={iconColor} />
        </div>
        <h3 className="font-bold text-lg mt-2">{title}</h3>
        {!isLoggedIn && (
          <div className="mt-2 text-xs text-gray-400">Sign in to access</div>
        )}
      </Card>
    </a>
  );
};

export default ToolCard;
