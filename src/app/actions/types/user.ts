import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '..';
import { User } from '../../models/user';

// action type
export interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
  data: {
    name: string;
    email: string;
    password: string;
    address: string;
    mobile: string;
  };
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

export interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  error: string;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  data: {
    email: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

export interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: string;
}

export type UserActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | LoginRequestAction
  | RegisterFailureAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction;

// action creater functions
export const registerRequest = (data: RegisterRequestAction['data']): RegisterRequestAction => ({
  type: REGISTER_REQUEST,
  data,
});

export const registerSuccess = (): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error: string): RegisterFailureAction => ({
  type: REGISTER_FAILURE,
  error,
});

export const loginRequest = (data: LoginRequestAction['data']): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  data,
});

export const loginSuccess = (payload: LoginSuccessAction['payload']): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  error,
});

export const logoutRequest = (): LogoutRequestAction => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error: string): LogoutFailureAction => ({
  type: LOGOUT_FAILURE,
  error,
});
