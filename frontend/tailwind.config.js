import { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Legacy pecha colors and custom colors for backward compatibility
      colors: {
        pecha: {
          primary: "#12dfec", // Blue
          secondary: "#8e57f1", // Purple
          tertiary: "#f2f4f4", // Gray White
        },
        // Hero component colors
        "peace-lavender": "hsl(270 50% 80%)",
        "sacred-white": "hsl(0 0% 98%)",
      },
      // Custom gradients
      backgroundImage: {
        "gradient-serenity":
          "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)",
        "gradient-wisdom": "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      },
      // Additional animations not covered by @theme
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Add any additional plugins here
  ],
};
