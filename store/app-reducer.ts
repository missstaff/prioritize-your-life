// Define AppState type
export interface AppState {
  isAuthenticated: boolean;
  uid: string;
}

// Define action types
export type Action =
  | { type: "UID"; uid: string }
  | { type: "Authenticated"; isAuthenticated: boolean };

export function appReducer(state: AppState, action: Action): AppState {
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
