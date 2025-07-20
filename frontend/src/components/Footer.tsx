import { BookOpen, Heart, Globe, Users, Brain, Sparkles } from "lucide-react";
import heroImage from "@/assets/favicon.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <img src={heroImage} alt="pecha.tools" className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">pecha.tools</h3>
                <p className="text-sm text-purple-200">
                  AI-Enhanced Buddhist Manuscript Tools
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Dedicated to preserving and sharing the wisdom of Buddhist
              teachings through innovative AI-powered digital tools and modern
              technologies.
            </p>
            <div className="flex items-center space-x-2 text-purple-200 mb-3">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Created with compassion</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-200">
              <Brain className="h-4 w-4" />
              <span className="text-sm">Powered by AI technology</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#tools"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>AI Tools</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>About</span>
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>Vision</span>
                </a>
              </li>
              <li>
                <a
                  href="https://forum.openpecha.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>Forum</span>
                  <BookOpen className="h-3 w-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Mission */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Our Mission</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
                  <Globe className="h-4 w-4 text-purple-300" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Global Access</h5>
                  <p className="text-sm text-gray-300">
                    Making Buddhist wisdom accessible worldwide through AI
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg mt-1">
                  <Users className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Community</h5>
                  <p className="text-sm text-gray-300">
                    Building bridges between tradition and AI technology
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg mt-1">
                  <Sparkles className="h-4 w-4 text-indigo-300" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">AI Innovation</h5>
                  <p className="text-sm text-gray-300">
                    Leveraging artificial intelligence for manuscript analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">&copy; 2025 pecha.tools.</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>and AI for all beings</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>
              Some tools utilize artificial intelligence to enhance manuscript
              processing and analysis capabilities.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
