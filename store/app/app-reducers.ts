export interface AppState {
    isVisible: boolean;
    selectedTab: number;
}

export type Action =
    | { type: "Visible"; isVisible: boolean }
    | { type: "Tab"; selectedTab: number };

    export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "Visible":
            return {
                ...state,
                isVisible: action.isVisible,
            };
        case "Tab":
            return {
                ...state,
                selectedTab: action.selectedTab,
            };
        default:
            return state;
    }
}