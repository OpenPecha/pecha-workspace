"use client";

import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollFadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const ScrollFadeIn = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
  threshold = 0.1,
  triggerOnce = false, // Changed default to false for bi-directional animation
}: ScrollFadeInProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  const getDirectionClasses = () => {
    const baseTransform = "transform transition-all ease-out";
    const durationClass = `duration-${duration}`;

    if (!isVisible) {
      switch (direction) {
        case "up":
          return `${baseTransform} ${durationClass} opacity-0 translate-y-8`;
        case "down":
          return `${baseTransform} ${durationClass} opacity-0 -translate-y-8`;
        case "left":
          return `${baseTransform} ${durationClass} opacity-0 translate-x-8`;
        case "right":
          return `${baseTransform} ${durationClass} opacity-0 -translate-x-8`;
        case "none":
          return `${baseTransform} ${durationClass} opacity-0`;
        default:
          return `${baseTransform} ${durationClass} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseTransform} ${durationClass} opacity-100 translate-y-0 translate-x-0`;
    }
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${getDirectionClasses()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollFadeIn;
