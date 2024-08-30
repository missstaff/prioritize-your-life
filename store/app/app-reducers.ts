export interface AppState {
    selectedTab: number;
}

export type Action =
    | { type: "Tab"; selectedTab: number };

/**
 * Reduces the application state based on the given action.
 * @param state - The current state of the application.
 * @param action - The action to be performed on the state.
 * @returns The new state of the application after applying the action.
 */
export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "Tab":
            return {
                ...state,
                selectedTab: action.selectedTab,
            };
        default:
            return state;
    }
}