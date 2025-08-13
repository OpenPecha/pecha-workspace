import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
import VisionSection from "@/components/VisionSection";
import {
  ServerStructuredData,
  websiteData,
  webApplicationData,
} from "@/components/ServerStructuredData";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <ServerStructuredData data={websiteData} />
      <ServerStructuredData data={webApplicationData} />
      <div className="min-h-screen">
        <Hero />
        <ToolsSection />
        <VisionSection />
      </div>
    </>
  );
}
