import { Button } from "./ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const TypewriterText = () => {
  const words = ["Wisdom", "Knowledge", "Heritage", "Teachings", "Scriptures", "Manuscripts", "Texts", "Pecha", "Buddhist Books"];
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
    <span className="block text-4xl sm:text-5xl lg:text-6xl leading-[normal] font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-lg ">
      {currentText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

const HeroImageCarousel = () => {
  const images = [
    {
      src: "https://live.staticflickr.com/6230/6326246420_817d3e3dd4_b.jpg",
      alt: "Buddhist Manuscripts - Traditional Pecha",
      title: "Traditional Pecha",
    },
    {
      src: "https://imgcdn.stablediffusionweb.com/2024/5/3/fe7cdb0d-7721-4ed3-901a-e8603a93106a.jpg",
      alt: "Tibetan Buddhist Texts",
      title: "Tibetan Texts",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/555547c4e4b0ee228d0fd235/351c3465-3ab3-498f-a702-9eb7835ecfa6/tibetan-buddhist-texts.jpg",
      alt: "Ancient Buddhist Scriptures",
      title: "Ancient Scriptures",
    },
    {
      src: "https://img.freepik.com/premium-photo/ancient-tibetan-buddhist-text-hands-brahman-monk_1105604-25647.jpg",
      alt: "Traditional Buddhist Literature",
      title: "Buddhist Literature",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl blur-3xl transform scale-110"></div>

      {/* Main Container */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-1 shadow-2xl border border-white/20">
        {/* Image Container */}
        <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="aspect-[4/5] relative">
            {/* Current Image */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isTransitioning
                  ? "opacity-0 scale-105"
                  : "opacity-100 scale-100"
              }`}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Modern Progress Bar */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentImageIndex) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setIsTransitioning(false);
                  }, 350);
                }
              }}
              className="group relative"
              aria-label={`View ${images[index].title}`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-500"
                    : "w-2 bg-gray-300 group-hover:bg-gray-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modern Feature Cards */}
      <div className="absolute -top-6 -left-6 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              AI Powered
            </span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse delay-500"></div>
            <span className="text-sm font-medium text-gray-700">
              Translation Ready
            </span>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 -right-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-1/3 -left-8 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-40 animate-pulse"></div>
    </div>
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
    <main role="main">
      <section
        className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 overflow-hidden pt-20"
        aria-labelledby="hero-heading"
              >
          {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 z-[1]" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C7D2FE,transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_80%_300px,#DBEAFE,transparent)]"></div>
        </div>

        {/* Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-64px)] py-4 lg:py-0">
            {/* Left Side - Content */}
            <header className="flex-1 max-w-2xl lg:pr-12 text-center lg:text-left">
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-sm">
                  <span className="text-sm font-medium text-primary">
                    🧘 Buddhist Manuscripts Platform
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-2">
                  <h1
                    id="hero-heading"
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-none"
                  >
                    <span className="block">Preserving Ancient</span>
                    <TypewriterText />
                    <span className="block bg-gradient-to-r leading-[normal] from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                      for the Digital Age
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  🧘 Comprehensive digital platform for Buddhist manuscripts,
                  providing specialized AI-powered tools for translation, transcription,
                  and preservation of ancient Pecha texts. Bridging ancient wisdom with modern technology
                  to create a more mindful and compassionate digital world.
                </p>

                {/* CTA Buttons */}
                <nav aria-label="Primary actions">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("tools")}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 px-8 py-3"
                      aria-describedby="tools-description"
                    >
                      Explore Tools
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                    <span id="tools-description" className="sr-only">
                      Navigate to the tools section to explore our Buddhist
                      manuscript processing tools
                    </span>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => scrollToSection("vision")}
                      className="border-2 border-border text-primary hover:bg-accent hover:border-border px-8 py-3 transition-all duration-300"
                      aria-describedby="mission-description"
                    >
                      <Heart className="mr-2 h-5 w-5" aria-hidden="true" />
                      Our Mission
                    </Button>
                    <span id="mission-description" className="sr-only">
                      Learn about our mission to preserve Buddhist manuscripts
                    </span>
                  </div>
                </nav>
              </div>
            </header>

            {/* Right Side - Hero Image Carousel */}
            <aside
              className="flex-1 max-w-lg lg:max-w-xl mt-12 lg:mt-0"
              aria-label="Buddhist manuscript showcase"
            >
              <HeroImageCarousel />
            </aside>
          </div>
        </div>


      </section>
    </main>
  );
};

export default Hero;
