import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-background via-primary/5 to-accent/10">
   
      <Header />
      <ParticlesBackground />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer className="relative z-10" />
      {/* AI Chatbot - Available site-wide */}
      <ChatBot />
    </div>
  );
};

export default Layout;