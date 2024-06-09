import React, { createContext, useReducer, ReactNode } from "react";

/**
 * Represents the state of the application.
 */

// Define AppState type
interface AppState {
  isAuthenticated: boolean;
  uid: string;
}

// Define context type
interface AppContextType extends AppState {
  isAuthenticated: boolean;
  uid: string;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUid: (uid: string | undefined) => void;
}

// Define action types
type Action =
  | { type: "UID"; uid: string }
  | { type: "Authenticated"; isAuthenticated: boolean };

export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  uid: "",
  setIsAuthenticated: () => {},
  setUid: () => {},
});

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "Authenticated":
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    case "UID":
      return {
        ...state,
        uid: action.uid,
      };
    default:
      return state;
  }
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, {
    isAuthenticated: false,
    uid: "",
  });

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    dispatch({ type: "Authenticated", isAuthenticated });
  };

  const setUid = (uid: string | undefined = "") => {
    dispatch({ type: "UID", uid: uid || "" });
  };

  console.log("AppContextProvider", state);

  const ctxValue: AppContextType = {
    isAuthenticated: state.isAuthenticated,
    uid: state.uid,
    setIsAuthenticated,
    setUid,
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};
