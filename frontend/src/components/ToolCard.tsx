import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card>
        <CardHeader>
          <CardTitle
            className={`${bgColor} ${iconColor} rounded-full p-3 text-center w-fit mx-auto`}
          >
            <Icon />
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
