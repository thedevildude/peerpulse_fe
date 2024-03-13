import { Reducer } from "react";
import { AuthAction, AuthState } from "./types";

export const intialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const authReducer: Reducer<AuthState, AuthAction> = (
  state = intialState,
  action,
) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};
