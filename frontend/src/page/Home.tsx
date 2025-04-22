import React from "react";
import ToolCard from "@/components/ToolCard";
import { FileText, Image, Headphones, Edit, LogIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTools } from "@/api/tools";
import { useAuth } from "@/contexts/AuthContext";

const Home: React.FC = () => {
  // const tools = [
  //   {
  //     title: "Translator Editor",
  //     description: "Computer-Assisted Translation (CAT) tool for Tibetan texts",
  //     icon: FileText,
  //     iconColor: "text-white",
  //     bgColor: "bg-pecha-primary",
  //     path: import.meta.env.VITE_TRANSLATOR_URL,
  //   },
  //   {
  //     title: "Image Transcriber",
  //     description: "Transcribe text from Tibetan manuscript images",
  //     icon: Image,
  //     iconColor: "text-white",
  //     bgColor: "bg-pecha-secondary",
  //     path: "/image-transcriber",
  //   },
  //   {
  //     title: "Audio Transcriber",
  //     description: "Convert Tibetan audio recordings to text",
  //     icon: Headphones,
  //     iconColor: "text-white",
  //     bgColor: "bg-blue-500",
  //     path: "/audio-transcriber",
  //   },
  //   {
  //     title: "Proofreading Editor",
  //     description: "Review and correct Tibetan manuscripts",
  //     icon: Edit,
  //     iconColor: "text-white",
  //     bgColor: "bg-purple-500",
  //     path: "/proofreading",
  //   },
  // ];

  const { data: toolsList, isLoading } = useQuery({
    queryKey: ["toolsList"],
    queryFn: () => getTools(),
  });
  const tools = toolsList?.map((tool, index) => ({
    title: tool.name,
    description: tool.description,
    icon: tool.icon,
    path: tool.link,
  }));
  console.log(tools);
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16 space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-pecha-primary">pecha</span>
          <span className="text-pecha-secondary">.tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A centralized hub for working with Bhuddhist manuscripts (Pecha),
          providing specialized tools for translation, transcription, and
          proofreading.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading && <div>loading</div>}
          {!isLoading &&
            tools.map((tool, index) => (
              <div
                key={tool.title}
                className="animate-slide-up"
                title={tool.description}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <ToolCard
                  title={tool.title}
                  icon={tool.icon}
                  path={tool.path}
                />
              </div>
            ))}
        </div>
      </section>

      <section className="rounded-xl p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About Pecha Tools</h2>
        <p className="text-gray-600 mb-4">
          Pecha.tools is a specialized platform designed for scholars,
          researchers, and practitioners working with Bhuddhist manuscripts. Our
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
