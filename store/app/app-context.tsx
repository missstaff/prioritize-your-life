import React, { createContext, useReducer, ReactNode } from "react";
import { appReducer, AppState, Action } from "./app-reducers";

export interface AppContextType extends AppState {
  setSelectedTab: (selectedTab: number) => void;
}

/**
 * The context for the app.
 * @param isVisible - Whether the app is visible.
 * @param selectedTab - The selected tab.
 * @param setIsVisible - Function to set the visibility of the app.
 * @param setSelectedTab - Function to set the selected tab.
 * @returns The app context.
 */
export const AppContext = createContext<AppContextType>({
  selectedTab: 0,
  setSelectedTab: () => {},
});

export interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    appReducer,
    {
      selectedTab: 0,
    }
  );

  const setSelectedTab = (selectedTab: number) => {
    dispatch({ type: "Tab", selectedTab });
  };

  const ctxValue: AppContextType = {
    ...state,
    setSelectedTab,
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};
