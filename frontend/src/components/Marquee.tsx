import React from "react";
import { Sparkles, Hammer, Zap } from "lucide-react";

const Marquee = () => {
  const marqueeText =
    "🚀 More amazing tools are coming soon! Stay tuned for exciting updates and new features to enhance your Buddhist manuscript studies";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-3 overflow-hidden shadow-lg">
      <div className="animate-marquee whitespace-nowrap flex items-center space-x-8">
        <div className="flex items-center space-x-2 text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>{marqueeText}</span>
          <Hammer className="h-4 w-4" />
          <span>{marqueeText}</span>
          <Zap className="h-4 w-4" />
          <span>{marqueeText}</span>
          <Sparkles className="h-4 w-4" />
          <span>{marqueeText}</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
