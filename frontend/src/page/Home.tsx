import React from "react";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { FileText, Image, Headphones, Edit, LogIn } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const Home: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const tools = [
    {
      title: "Translator Editor",
      description: "Computer-Assisted Translation (CAT) tool for Tibetan texts",
      icon: FileText,
      iconColor: "text-white",
      bgColor: "bg-pecha-primary",
      path: import.meta.env.VITE_TRANSLATOR_URL,
    },
    {
      title: "Image Transcriber",
      description: "Transcribe text from Tibetan manuscript images",
      icon: Image,
      iconColor: "text-white",
      bgColor: "bg-pecha-secondary",
      path: "/image-transcriber",
    },
    {
      title: "Audio Transcriber",
      description: "Convert Tibetan audio recordings to text",
      icon: Headphones,
      iconColor: "text-white",
      bgColor: "bg-blue-500",
      path: "/audio-transcriber",
    },
    {
      title: "Proofreading Editor",
      description: "Review and correct Tibetan manuscripts",
      icon: Edit,
      iconColor: "text-white",
      bgColor: "bg-purple-500",
      path: "/proofreading",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16 space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-pecha-primary">pecha</span>
          <span className="text-pecha-secondary">.tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A centralized hub for working with Tibetan manuscripts (Pecha),
          providing specialized tools for translation, transcription, and
          proofreading.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-10">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="animate-slide-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <ToolCard
                title={tool.title}
                icon={tool.icon}
                iconColor={tool.iconColor}
                bgColor={tool.bgColor}
                path={tool.path}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About Pecha Tools</h2>
        <p className="text-gray-600 mb-4">
          Pecha.tools is a specialized platform designed for scholars,
          researchers, and practitioners working with Tibetan manuscripts. Our
          suite of tools helps streamline the process of translating,
          transcribing, and proofreading these valuable cultural artifacts.
        </p>
        <p className="text-gray-600">
          With a centralized login system, users can seamlessly access all tools
          and maintain consistency across their projects. Our modern, intuitive
          interface ensures that users can focus on their work rather than
          navigating complex software.
        </p>
      </section>
    </div>
  );
};

export default Home;
