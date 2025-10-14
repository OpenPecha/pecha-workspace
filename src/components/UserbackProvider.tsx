// UserbackProvider.tsx
'use client';
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import Userback from '@userback/widget';
import { useUser } from '@auth0/nextjs-auth0/client';

interface UserbackProviderProps {
  children: React.ReactNode;
  userbackId: string;
}

interface UserbackContextType {
  userback: any;
}
const UserbackContext = createContext<UserbackContextType>({ userback: null });

export const UserbackProvider: React.FC<UserbackProviderProps> = ({userbackId, children }) => {
  const [userback, setUserback] = useState<any>(null);
  const authUser = useUser();
  const user= authUser?.user||null;
  useEffect(() => {
    if(!user) return;
    const usebackId = userbackId;
    const init = async () => {
      try {
        const options = {
          user_data: {
            id: user?.id||'anonymous',
            info: {
              name: user?.name||'Anonymous User',
              email: user?.email || ''
            }
          }
        };
        const instance = await Userback(usebackId, options);
 
        setUserback(instance);
        
        
      } catch (error) {
        console.error('Failed to initialize Userback:', error);
        // Add more detailed error information
        if(error instanceof Error){
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          userbackId: usebackId,
          userData: user
        });
        }
      }
    };
    
    init();
  }, [user]);

  const contextValue = useMemo(() => ({ userback }), [userback]);

  return (
    <UserbackContext.Provider value={contextValue}>
      {children}
    </UserbackContext.Provider>
  );
};

export const useUserback = () => useContext(UserbackContext);



