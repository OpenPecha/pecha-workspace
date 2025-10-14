'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ScrollFadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggered || !triggerOnce) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) {
                setHasTriggered(true);
              }
            }, delay);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold, triggerOnce, hasTriggered]);

  const getTransformClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (isVisible) {
      return `${baseClasses} opacity-100 translate-x-0 translate-y-0`;
    }

    switch (direction) {
      case 'up':
        return `${baseClasses} opacity-0 translate-y-8`;
      case 'down':
        return `${baseClasses} opacity-0 -translate-y-8`;
      case 'left':
        return `${baseClasses} opacity-0 translate-x-8`;
      case 'right':
        return `${baseClasses} opacity-0 -translate-x-8`;
      default:
        return `${baseClasses} opacity-0 translate-y-8`;
    }
  };

  return (
    <div ref={elementRef} className={`${getTransformClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollFadeIn;

