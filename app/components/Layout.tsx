import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Optimized Particle Background */}
      <ParticlesBackground />
      
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer className="relative z-10" />
    </div>
  );
};

export default Layout;