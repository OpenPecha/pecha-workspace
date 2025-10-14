import { BookOpen, Heart, Globe, Users, Brain, Sparkles } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={` bg-primary-700 dark:bg-primary-700 text-neutral-400 dark:text-neutral-200 from-primary/90 via-secondary/90 to-primary/90  py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <img
                  src="/icon_logo.png"
                  alt="Buddhist AI Studio"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold ">Buddhist AI Studio</h3>
                <p className="text-sm ">
                  AI-Enhanced Buddhist Manuscript Tools
                </p>
              </div>
            </div>
            <p className=" leading-relaxed mb-6">
              Dedicated to preserving and sharing the wisdom of Buddhist
              teachings through innovative AI-powered digital tools and modern
              technologies.
            </p>
            <div className="flex items-center space-x-2  mb-3">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Created with compassion</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <Brain className="h-4 w-4" />
              <span className="text-sm">Powered by AI technology</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 ">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#tools"
                  className=" hover: transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>AI Tools</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className=" hover: transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>About</span>
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className=" hover: transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>Vision</span>
                </a>
              </li>
              <li>
                <a
                  href="https://forum.openpecha.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover: transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span className="w-1 h-1 bg-white/60 rounded-full group-hover:bg-white transition-colors"></span>
                  <span>Forum</span>
                  <BookOpen className="h-3 w-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Mission */}
          <div>
            <h4 className="font-bold text-lg mb-6 ">Our Mission</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white/10 rounded-lg mt-1">
                  <Globe className="h-4 w-4 " />
                </div>
                <div>
                  <h5 className="font-medium  mb-1">Global Access</h5>
                  <p className="text-sm ">
                    Making Buddhist wisdom accessible worldwide through AI
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white/10 rounded-lg mt-1">
                  <Users className="h-4 w-4 " />
                </div>
                <div>
                  <h5 className="font-medium  mb-1">Community</h5>
                  <p className="text-sm ">
                    Building bridges between tradition and AI technology
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white/10 rounded-lg mt-1">
                  <Sparkles className="h-4 w-4 " />
                </div>
                <div>
                  <h5 className="font-medium  mb-1">AI Innovation</h5>
                  <p className="text-sm ">
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
            <p className="/60 text-sm">&copy; 2025 Buddhist AI Studio.</p>
            <div className="flex items-center space-x-6 text-sm /60">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>and AI for all beings</span>
            </div>
          </div>
          <div className="mt-4 text-xs /50">
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

