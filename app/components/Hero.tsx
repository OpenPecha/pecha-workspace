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
        } else if (currentText.length < currentWord.length) {
          // Adding characters
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setIsPaused(true);
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



const Hero = () => {
  return (
      <section
        className="relative flex flex-col bg-gradient-to-br from-background via-primary/5 to-accent/10 overflow-hidden pt-20"
        aria-labelledby="hero-heading"
              >
        

        
        <div className="flex flex-col text-center mt-4 gap-4 relative z-10">
         <span className="text-sm text-gray-500">A platform to manage your</span>
         <span className="text-8xl font-light ">AI Powered Digital Tools</span>
        </div>
        <div className="flex justify-center p-20 mt-10 relative z-10">
         <div className="relative">
           <img src="/img/macframe.png" alt="MacBook frame showcasing the platform" className="hero-image-container w-full h-auto object-contain drop-shadow-2xl" />
           
           {/* Floating Comments Around Image */}
           <div className="absolute inset-0 pointer-events-none">
             {/* Comment 1 - Top Left (Overlapping) */}
             <div className="absolute -top-8 -left-16 animate-float-slow z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border/20 max-w-xs transform rotate-[-8deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-start gap-3">
                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                     T
                   </div>
                   <div>
                     <p className="text-sm text-card-foreground">"Amazing tool for Tibetan manuscripts!"</p>
                     <span className="text-xs text-muted-foreground">- Translator</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Comment 2 - Top Right (Outside) */}
             <div className="absolute -top-12 -right-20 animate-float-medium z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border/20 max-w-sm transform rotate-[6deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-start gap-3">
                   <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                     S
                   </div>
                   <div>
                     <p className="text-sm text-card-foreground">"Processed 500 pages in minutes! 🚀"</p>
                     <span className="text-xs text-muted-foreground">- Scholar</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Comment 3 - Left Side (Overlapping) */}
             <div className="absolute top-1/4 -left-24 animate-float-fast z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border/20 max-w-xs transform rotate-[-4deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-medium text-green-600">Live Translation</span>
                 </div>
                 <p className="text-sm text-card-foreground">བཀྲ་ཤིས་བདེ་ལེགས། → "Good fortune!"</p>
               </div>
             </div>

             {/* Comment 4 - Right Side (Outside) */}
             <div className="absolute top-1/3 -right-28 animate-float-slow z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border/20 max-w-sm transform rotate-[5deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-start gap-3">
                   <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                     M
                   </div>
                   <div>
                     <p className="text-sm text-card-foreground">"OCR accuracy is incredible! ✨"</p>
                     <span className="text-xs text-muted-foreground">- Monk</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Comment 5 - Bottom Left (Outside) */}
             <div className="absolute -bottom-6 -left-20 animate-float-medium z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border/20 max-w-xs transform rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-3">
                   <div className="flex-shrink-0">
                     <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                       <span className="text-xs">⭐</span>
                     </div>
                   </div>
                   <div>
                     <p className="text-sm text-card-foreground font-medium">5.0 Rating</p>
                     <span className="text-xs text-muted-foreground">1,200+ users</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Comment 6 - Bottom Right (Overlapping) */}
             <div className="absolute -bottom-8 -right-16 animate-float-fast z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border/20 max-w-sm transform rotate-[4deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-start gap-3">
                   <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                     A
                   </div>
                   <div>
                     <p className="text-sm text-card-foreground">"Perfect for ancient texts 📜"</p>
                     <span className="text-xs text-muted-foreground">- Archivist</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Small floating indicators around image */}
             <div className="absolute top-12 left-1/4 animate-pulse z-10">
               <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"></div>
             </div>
             <div className="absolute bottom-16 right-1/4 animate-pulse delay-500 z-10">
               <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-40"></div>
             </div>
             <div className="absolute top-1/2 left-12 animate-pulse delay-1000 z-10">
               <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-50"></div>
             </div>
           </div>
         </div>
       </div>
       

      </section>
  );
};

export default Hero;
