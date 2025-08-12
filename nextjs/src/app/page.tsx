import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
import VisionSection from "@/components/VisionSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ToolsSection />
      <VisionSection />
    </div>
  );
}
