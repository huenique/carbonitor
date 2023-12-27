import React, { createContext, useEffect, useState } from 'react';

import { getCookieSession } from '../utils/cookie';

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
  const [userId, setUser] = useState<Email | null>(null);

  useEffect(() => {
    const userIdFromCookie = getCookieSession();
    console.log('User ID from cookie:', userIdFromCookie);

    setUser(typeof userIdFromCookie === 'string' ? userIdFromCookie : null);
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
