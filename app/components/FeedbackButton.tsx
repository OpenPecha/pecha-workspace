import { useUserback } from "~/context/UserbackProvider";

export const FeedbackButton = () => {
    const { userback } = useUserback();
    
    const handleClick = () => {
      if (userback) {
        userback.open();
      } else {
        console.warn('Userback not initialized');
      }
    };
    
    return (
      <button onClick={handleClick} className="feedback-button">
        Feedback
      </button>
    );
  };