import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/favicon.png";

const TypewriterText = () => {
  const words = ["Wisdom", "Knowledge", "Heritage", "Teachings", "Scriptures"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          // Deleting characters
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Move to next word
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        } else {
          // Adding characters
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // Pause before deleting
            setIsPaused(true);
          }
        }
      },
      isPaused ? 2000 : isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words]);

  return (
    <span className="block bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const Hero = () => {
  return (
    <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Purple/Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Peaceful Buddhist temple"
          className="w-full h-full object-cover"
        />
        {/* Dark base overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Beautiful purple to blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-indigo-900/80"></div>
        {/* Additional subtle dark overlay for extra text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Preserving Ancient
            <TypewriterText />
            for the Digital Age
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed drop-shadow-md">
            A centralized hub for working with Buddhist manuscripts (Pecha),
            providing specialized tools for translation, transcription, and
            proofreading.
          </p>

          <div className="flex flex-col pt-3 sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("tools")}
              className="bg-white text-purple-700 hover:bg-purple-50 hover:text-purple-800 shadow-lg font-semibold px-8 transition-all duration-300 cursor-pointer"
            >
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("vision")}
              className="border-white/50 text-white hover:bg-white/15 hover:border-white/70 px-8 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <Heart className="mr-2 h-5 w-5" />
              Our Mission
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements with Purple/Blue theme */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400/70 rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;
