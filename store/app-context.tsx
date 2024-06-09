import React, { createContext, useReducer, ReactNode } from "react";
import { appReducer, AppState, Action } from "./app-reducer";

/**
 * Represents the state of the application.
 */

// Define context type
interface AppContextType extends AppState {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUid: (uid: string | undefined) => void;
}

export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  uid: "",
  setIsAuthenticated: () => {},
  setUid: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    appReducer,
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

  const ctxValue: AppContextType = {
    isAuthenticated: state.isAuthenticated,
    uid: state.uid,
    setIsAuthenticated,
    setUid,
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};
