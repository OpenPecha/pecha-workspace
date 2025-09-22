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
<></>
  );
}
