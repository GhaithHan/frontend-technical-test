import React, { createContext, useState } from 'react';
import { User } from '../../types/user';

interface UserContext {
  currentUser: User;
  updateCurrentUser: (user: User) => void;
}

export const CurrentUserContext = createContext<UserContext>(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const updateCurrentUser = (user: User) => {
    setCurrentUser(user);
  };
  return (
    <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
