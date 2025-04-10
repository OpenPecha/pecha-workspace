import React from "react";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-4 mt-auto border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center">
            <span className="text-pecha-primary font-bold">pecha</span>
            <span className="text-pecha-secondary font-bold">.tools</span>
          </div>
          <div className="flex gap-6 text-sm"></div>
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} pecha.tools
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
