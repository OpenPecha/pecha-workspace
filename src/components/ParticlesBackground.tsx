'use client';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  className?: string;
}

const ParticlesBackground = ({ className = "" }: ParticlesBackgroundProps) => {
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
        await loadSlim(engine);
    }).then(() => {
        setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
  };
  
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'auto',
      }}
    >
      {init && <Particles
        id="tsparticles"
        className="w-full h-full"
        particlesLoaded={particlesLoaded}
        options={{
        background: {
          opacity: 0, // Transparent background
        },
        fpsLimit: 60, // Reduced for better performance
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            push: {
              quantity: 3,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#6366f1", "#8b5cf6", "#3b82f6", "#06b6d4", "#10b981"], // Multiple colors for triangles
          },
          links: {
            color: "#6366f1",
            distance: 120,
            enable: true,
            opacity: 0.3, // Visible connections for triangles
            width: 0.5,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1, // Slower for better performance
            straight: false,
          },
          number: {
            value: 80, // Reduced for better performance
          },
          opacity: {
            value: 0.4, // Slightly more transparent
            animation: {
              enable: true,
              speed: 0.3,
              sync: false,
            },
          },
          shape: {
            type: "triangle",
          },
          size: {
            value: { min: 2, max: 6 }, // Variable triangle sizes
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
          },
          rotate: {
            value: 0,
            random: true,
            direction: "clockwise",
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
        },
        detectRetina: true,

        preset: undefined,
        smooth: true,
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: {
                  value: 50,
                }
              }
            }
          }
        ],
      }}
      ></Particles> }
    </div>
  );
};

export default ParticlesBackground;

