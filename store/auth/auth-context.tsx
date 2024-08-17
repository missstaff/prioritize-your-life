import React, { createContext, useReducer, ReactNode } from "react";
import { authReducer, AuthState, Action } from "./auth-reducer";

/**
 * Represents the state of the application.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @property {string} uid - The user ID.
 * @property {function} setIsAuthenticated - Sets the value of isAuthenticated.
 * @property {function} setUid - Sets the value of uid.
 */

// Define context type
interface AuthContextType extends AuthState {
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
    isAuthenticated: state.isAuthenticated,
    uid: state.uid,
    setIsAuthenticated,
    setUid,
  };

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};
