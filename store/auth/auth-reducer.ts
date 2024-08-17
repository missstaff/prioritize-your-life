
export interface AuthState {
  isAuthenticated: boolean;
  uid: string;
}

export type Action =
  | { type: "UID"; uid: string }
  | { type: "Authenticated"; isAuthenticated: boolean };

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
