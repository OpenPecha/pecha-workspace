// UserbackProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Userback from '@userback/widget';
import { useUserStore } from '~/store/user';

const UserbackContext = createContext(null);

export const UserbackProvider = ({ children }) => {
  const [userback, setUserback] = useState(null);
  const {user}= useUserStore();
  useEffect(() => {
    
    const usebackId="A-fzO9tMbn2LqjINi7r3bhXZKtd"
    const init = async () => {

      const options = {
        user_data: {
          id: user?.sub, // example data
          info: {
            name: user?.name, // example data
            email: user?.email // example data
          }
        }
      };
      const instance = await Userback(usebackId, options);
      setUserback(instance);
    };
    init();
  }, []);

  return (
    <UserbackContext.Provider value={userback}>
      {children}
    </UserbackContext.Provider>
  );
};

export const useUserback = () => useContext(UserbackContext);



