import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isTranslatorPath = location.pathname === "/translator";

  // Don't show the regular header and footer on the translator page
  if (isTranslatorPath) {
    return (
      <div className="flex flex-col min-h-screen bg-white">{children}</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
