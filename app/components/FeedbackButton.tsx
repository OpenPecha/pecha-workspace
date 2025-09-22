import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useUserback } from '../context/UserbackProvider';

export function FeedbackButton() {
  const { userback, isLoaded } = useUserback();

  const handleClick = () => {
    try {
      // Check if Userback is loaded before trying to open
      if (isLoaded && userback?.openForm) {
        console.log('Using provider userback instance');
        userback.openForm();
      }
      // Fallback to global window access with loading check
      else if ((window as any).UserbackLoaded && (window as any).Userback?.openForm) {
        console.log('Using global window.Userback');
        (window as any).Userback.openForm();
      }
      // Try with a delay if not loaded yet
      else if (userback) {
        console.log('Userback exists but not fully loaded, trying with delay...');
        setTimeout(() => {
          if (userback?.openForm) {
            userback.openForm();
          } else {
            console.log('Still not loaded, using email fallback');
            window.open('mailto:feedback@pecha.tools?subject=Feedback&body=Please share your feedback:', '_blank');
          }
        }, 1000);
      }
      // Final fallback
      else {
        console.log('Userback not available - opening fallback feedback option');
        window.open('mailto:feedback@pecha.tools?subject=Feedback&body=Please share your feedback:', '_blank');
      }
    } catch (error) {
      console.error('Error opening Userback form:', error);
      // Fallback to email
      window.open('mailto:feedback@pecha.tools?subject=Feedback&body=Please share your feedback:', '_blank');
    }
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <button 
        onClick={handleClick}
        className={`feedback-button-vertical px-4 py-6 rounded-l-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-2 group transform hover:-translate-x-1 ${
          isLoaded 
            ? 'bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-400 border border-primary-500 dark:border-primary-400' 
            : 'bg-neutral-500 dark:bg-neutral-600 border border-neutral-400 dark:border-neutral-500 cursor-wait'
        } text-neutral-50`}
        aria-label={isLoaded ? "Give feedback" : "Loading feedback widget..."}
        disabled={!isLoaded && !userback}
      >
        <MessageSquare className={`h-5 w-5 transition-transform duration-300 ${
          isLoaded ? 'transform group-hover:scale-110' : 'animate-pulse'
        }`} />
        <span className="text-sm font-medium tracking-wider" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          {isLoaded ? 'Feedback' : 'Loading...'}
        </span>
      </button>
    </div>
  );
}
