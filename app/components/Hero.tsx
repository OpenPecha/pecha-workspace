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
      (() => {
        if (isPaused) return 2000;
        if (isDeleting) return 50;
        return 100;
      })()
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
        className="relative hidden md:flex md:min-h-screen   flex-col bg-transparent "
        aria-labelledby="hero-heading"
              >
        <div className="flex flex-col text-center mt-4 gap-4 relative z-10 px-4">
         <span className="text-sm text-gray-500">A platform to manage </span>
         <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">Powering Buddhist AI. Together</span>
        </div>
        <div className="flex justify-center p-4 sm:p-8 md:p-12 lg:p-20 mt-6 sm:mt-8 md:mt-10 relative z-10">
         <div className="relative w-full max-w-5xl">
           {/* Gradient blob for glowing light effect behind laptop */}
           <div className="gradient-light-blob"></div>
          
           <img src="/img/macframe.png" alt="MacBook frame showcasing the platform" className="w-full h-auto object-contain drop-shadow-2xl relative z-10" />
           
           {/* Diverse Floating Elements - Scattered Design - Hidden on mobile */}
           <div className="absolute inset-0 pointer-events-none hidden lg:block">
             
             {/* Profile Avatar 1 - Top Left */}
             <div className="absolute -top-16 -left-24 animate-float-slow z-20 ">
               <img 
                 src="https://picsum.photos/64/64?random=6" 
                 alt="Tibetan Scholar Avatar" 
                 className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-purple-500/50 transform rotate-[-12deg] hover:rotate-0 transition-transform duration-300" 
               />
             </div>

             {/* Statistics Card - Top Center */}
             <div className="absolute -top-20 left-1/4 animate-float-medium z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-border/20 transform rotate-[8deg] hover:rotate-0 transition-transform duration-300">
                 <div className="text-center">
                   <div className="text-2xl font-bold text-primary">2.5K+</div>
                   <div className="text-xs text-muted-foreground">Manuscripts Processed</div>
                 </div>
               </div>
             </div>

             {/* Social Media Style Card - Top Right */}
             <div className="absolute -top-12 -right-32 animate-float-fast z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border/20 max-w-xs transform rotate-[-15deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-2 mb-3">
                   <img src="https://picsum.photos/32/32?random=7" alt="@TibetanScholar" className="w-8 h-8 rounded-full object-cover" />
                   <div>
                     <div className="text-sm font-medium text-card-foreground">@TibetanScholar</div>
                     <div className="text-xs text-muted-foreground">2m ago</div>
                   </div>
                 </div>
                 <p className="text-sm text-card-foreground">"Just discovered this amazing tool! 🔥"</p>
                 <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                   <span>❤️ 24</span>
                   <span>💬 8</span>
                   <span>🔄 12</span>
                 </div>
               </div>
             </div>

             {/* Interface Mockup - Left Side */}
             <div className="absolute top-1/4 -left-36 animate-float-slow z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border/20 transform rotate-[6deg] hover:rotate-0 transition-transform duration-300">
                 <div className="text-xs text-muted-foreground mb-2">Translation Progress</div>
                 <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                   <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                 </div>
                 <div className="text-xs text-muted-foreground mt-1">75% Complete</div>
               </div>
             </div>

             {/* Large Profile Card - Left Center */}
             <div className="absolute top-1/3 -left-28 animate-float-medium z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border/20 max-w-sm transform rotate-[-8deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-3">
                   <img src="https://picsum.photos/48/48?random=8" alt="Tenzin Kalden" className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50" />
                   <div>
                     <div className="font-medium text-card-foreground">Tenzin Kalden</div>
                     <div className="text-xs text-muted-foreground">Tibetan Language Expert</div>
                     <div className="text-xs text-green-600">● Online</div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Notification Style - Right Side */}
             <div className="absolute top-1/4 -right-40 animate-float-fast z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border/20 max-w-xs transform rotate-[12deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                   <span className="text-sm font-medium text-card-foreground">New Text Analyzed</span>
                 </div>
                 <p className="text-xs text-muted-foreground mt-1">Lotus Sutra - Chapter 3 completed</p>
               </div>
             </div>

             {/* Circular Progress - Right Center */}
             <div className="absolute top-1/2 -right-24 animate-float-slow z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-full w-20 h-20 shadow-lg border border-border/20 flex items-center justify-center transform rotate-[-10deg] hover:rotate-0 transition-transform duration-300">
                 <div className="text-center">
                   <div className="text-lg font-bold text-primary">98%</div>
                   <div className="text-xs text-muted-foreground">OCR</div>
                 </div>
               </div>
             </div>

             {/* Mini Chat Interface - Bottom Left */}
             <div className="absolute -bottom-12 -left-32 animate-float-medium z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-border/20 max-w-xs transform rotate-[7deg] hover:rotate-0 transition-transform duration-300">
                 <div className="space-y-2">
                   <div className="bg-primary/20 rounded-lg px-3 py-1">
                     <div className="text-xs text-card-foreground">Translate this text</div>
                   </div>
                   <div className="bg-muted/50 rounded-lg px-3 py-1">
                     <div className="text-xs text-card-foreground">ཨོཾ་མ་ཎི་པད་མེ་ཧཱུྃ།</div>
                   </div>
                   <div className="flex items-center gap-1">
                     <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                     <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                     <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Achievement Badge - Bottom Center */}
             <div className="absolute -bottom-8 left-1/3 animate-float-fast z-20">
               <div className="floating-comment bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl px-4 py-3 shadow-lg text-white transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
                 <div className="flex items-center gap-2">
                   <span className="text-lg">🏆</span>
                   <div>
                     <div className="text-sm font-bold">Expert Level</div>
                     <div className="text-xs opacity-90">1000+ texts processed</div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Profile Grid - Bottom Right */}
             <div className="absolute -bottom-16 -right-28 animate-float-slow z-20">
               <div className="floating-comment bg-card/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-border/20 transform rotate-[9deg] hover:rotate-0 transition-transform duration-300">
                 <div className="grid grid-cols-3 gap-1">
                   <img src="https://picsum.photos/32/32?random=1" alt="User 1" className="w-8 h-8 rounded-full object-cover" />
                   <img src="https://picsum.photos/32/32?random=2" alt="User 2" className="w-8 h-8 rounded-full object-cover" />
                   <img src="https://picsum.photos/32/32?random=3" alt="User 3" className="w-8 h-8 rounded-full object-cover" />
                   <img src="https://picsum.photos/32/32?random=4" alt="User 4" className="w-8 h-8 rounded-full object-cover" />
                   <img src="https://picsum.photos/32/32?random=5" alt="User 5" className="w-8 h-8 rounded-full object-cover" />
                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">+</div>
                 </div>
                 <div className="text-xs text-center text-muted-foreground mt-2">Active translators</div>
               </div>
             </div>

             {/* Floating Decorative Elements */}
             <div className="absolute top-20 left-1/5 animate-pulse z-10">
               <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-60"></div>
             </div>
             <div className="absolute bottom-24 right-1/5 animate-pulse delay-500 z-10">
               <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-40"></div>
             </div>
             <div className="absolute top-2/3 left-20 animate-pulse delay-1000 z-10">
               <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-50"></div>
             </div>
             <div className="absolute top-1/5 right-1/4 animate-pulse delay-1500 z-10">
               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-70"></div>
             </div>

           </div>
         </div>
       </div>
       

      </section>
  );
};

export default Hero;

