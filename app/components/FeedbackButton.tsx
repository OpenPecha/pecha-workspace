import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useUserback } from '../context/UserbackProvider';

export function FeedbackButton() {
  const userback = useUserback();

  const handleClick = () => {
    console.log(userback);
    if (userback) {
      userback.openForm('bug');
    } else {
    }
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <button 
        onClick={handleClick}
        className="feedback-button-vertical bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-400 text-neutral-50 px-4 py-6 rounded-l-2xl border border-primary-500 dark:border-primary-400 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-2 group transform hover:-translate-x-1"
        aria-label="Give feedback"
      >
        <MessageSquare className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
    
      </button>
    </div>
  );
}
