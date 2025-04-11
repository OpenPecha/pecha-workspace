import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  path: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  icon: Icon,
  iconColor,
  bgColor,
  path,
}) => {
  return (
    <a
      href={path}
      className={cn("block transition-transform duration-300 hover:scale-105")}
    >
      <Card className="tool-card h-full">
        <div className={cn("tool-icon", bgColor)}>
          <Icon size={32} className={iconColor} />
        </div>
        <h3 className="font-bold text-lg mt-2">{title}</h3>
      </Card>
    </a>
  );
};

export default ToolCard;
