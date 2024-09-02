export interface AppState {
    selectedTab: number;
}

export type Action =
    | { type: "Tab"; selectedTab: number };


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