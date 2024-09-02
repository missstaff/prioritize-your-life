import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer, AuthState, Action } from "./auth-reducer";

export interface AuthContextType extends AuthState {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUid: (uid: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  uid: "",
  setIsAuthenticated: () => {},
  setUid: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<AuthState, Action>>(
    authReducer,
    {
      isAuthenticated: false,
      uid: "",
    }
  );

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    dispatch({ type: "Authenticated", isAuthenticated });
  };

  const setUid = (uid: string | undefined = "") => {
    dispatch({ type: "UID", uid: uid || "" });
  };

  const ctxValue: AuthContextType = {
    ...state,
    setIsAuthenticated,
    setUid,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};
