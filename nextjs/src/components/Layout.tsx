"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Marquee from "./Marquee";
import Breadcrumbs from "./Breadcrumbs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isTranslatorPath = pathname === "/translator";

  // Don't show the regular header and footer on the translator page
  if (isTranslatorPath) {
    return (
      <div className="flex flex-col min-h-screen bg-white">{children}</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Breadcrumbs />
      <main className={`flex-grow ${pathname === "/" ? "pt-0" : "pt-20"}`}>
        {children}
      </main>
      <Footer />
      <Marquee />
    </div>
  );
};

export default Layout;
