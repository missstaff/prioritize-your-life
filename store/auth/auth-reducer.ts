
export interface AuthState {
  isAuthenticated: boolean;
  uid: string;
}

export type Action =
  | { type: "UID"; uid: string }
  | { type: "Authenticated"; isAuthenticated: boolean };

/**
 * Reducer function for handling authentication state.
 * @param state - The current authentication state.
 * @param action - The action object that describes the state change.
 * @returns The new authentication state.
 */
export function authReducer(state: AuthState, action: Action): AuthState {
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
