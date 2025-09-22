import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";
import ChatBot from "./ChatBot";
import { UserbackProvider } from "../context/UserbackProvider";
import { FeedbackButton } from "./FeedbackButton";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <UserbackProvider>
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-neutral-50 dark:from-neutral-900 via-primary-50/20 dark:via-primary-900/20 to-secondary-50/20 dark:to-secondary-900/20">
   
      <Header />
      <ParticlesBackground />
      <main className="flex-grow relative z-10 pt-20">
        {children}
      </main>
      <Footer className="relative z-10" />
      {/* AI Chatbot - Available site-wide */}
      <ChatBot />
      {/* Feedback Button - Available site-wide */}
      <FeedbackButton />

    </div>
    </UserbackProvider>
  );
};

export default Layout;