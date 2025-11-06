"use client";

import { User } from "@/services/getUserFromToken";
import { createContext, useContext } from "react";

type UserContextType = {
  user: User | null;
};

type UserProviderProps = {
  user: User | null;
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({ user: null });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
