import React from "react";
import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
import VisionSection from "@/components/VisionSection";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ToolsSection />
      <VisionSection />
    </div>
  );
};

export default Home;
