// UserbackProvider.tsx
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import Userback from '@userback/widget';
import { useUserStore } from '~/store/user';

interface UserbackProviderProps {
  children: React.ReactNode;
}

interface UserbackContextType {
  userback: any;
  isLoaded: boolean;
}

const UserbackContext = createContext<UserbackContextType>({ userback: null, isLoaded: false });

export const UserbackProvider: React.FC<UserbackProviderProps> = ({ children }) => {
  const [userback, setUserback] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { user } = useUserStore();

  useEffect(() => {
    const usebackId = "A-fzO9tMbn2LqjINi7r3bhXZKtd";
    
    const init = async () => {
      try {
      
        const options = {
          user_data: {
            id: user?.sub || 'anonymous',
            info: {
              name: user?.name || 'Anonymous User',
              email: user?.email || ''
            }
          }
        };
        const instance = await Userback(usebackId, options);
        
        // Wait for the widget to be fully loaded
        const checkLoaded = () => {
          if (instance && typeof instance.openForm === 'function') {
            console.log('Userback widget loaded successfully');
            setUserback(instance);
            setIsLoaded(true);
            
            // Make it available globally with loaded flag
            (window as any).Userback = instance;
            (window as any).UserbackLoaded = true;
          } else {
            console.log('Userback widget not ready yet, retrying...');
            setTimeout(checkLoaded, 500); // Retry after 500ms
          }
        };
        
        // Start checking if loaded
        checkLoaded();
        
      } catch (error) {
        console.error('Failed to initialize Userback:', error);
        // Set a timeout fallback
        setTimeout(() => {
          if (!isLoaded) {
            console.log('Userback failed to load after 5 seconds, using fallback');
            setIsLoaded(false);
          }
        }, 5000);
      }
    };
    
    init();
  }, []);

  const contextValue = useMemo(() => ({ userback, isLoaded }), [userback, isLoaded]);

  return (
    <UserbackContext.Provider value={contextValue}>
      {children}
    </UserbackContext.Provider>
  );
};

export const useUserback = () => useContext(UserbackContext);



