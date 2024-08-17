import React, { createContext, useReducer, ReactNode } from "react";
import { appReducer, AppState, Action } from "./app-reducers";

export interface AppContextType extends AppState {
    setIsVisible: (isVisible: boolean) => void;
    setSelectedTab: (selectedTab: number) => void;
}

export const AppContext = createContext<AppContextType>({
    isVisible: false,
    selectedTab: 0,
    setIsVisible: () => {},
    setSelectedTab: () => {},
});

export interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
        appReducer,
        {
            isVisible: false,
            selectedTab: 0,
        }
    );

    const setIsVisible = (isVisible: boolean) => {
        dispatch({ type: 'Visible', isVisible });
    };
    const setSelectedTab = (selectedTab: number) => {
        dispatch({ type: 'Tab', selectedTab });
    };

    const ctxValue: AppContextType = {
        ...state,
        setIsVisible,
        setSelectedTab,
    };

    return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};
