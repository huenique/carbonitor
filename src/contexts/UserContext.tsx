import localforage from 'localforage';
import React, { createContext, useEffect, useState } from 'react';

type Email = string;

export interface UserContextType {
  userId: Email | null;
  setUser: React.Dispatch<React.SetStateAction<Email | null>>;
}

// Create the context with the initial value as undefined
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Email | null>(null);

  useEffect(() => {
    localforage.getItem('user').then((userData) => {
      setUser(userData as Email | null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ userId: user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
