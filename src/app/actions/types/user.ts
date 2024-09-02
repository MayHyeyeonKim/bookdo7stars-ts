import { User } from '../../models/user';
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
  RESET_REGISTER_STATE,
  RESET_LOGIN_STATE,
} from '../constants';

// action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.
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
  payload: string;
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
  payload: string;
}

export interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: string;
}

export interface ResetRegisterStateAction {
  type: typeof RESET_REGISTER_STATE;
}
export interface ResetLoginStateAction {
  type: typeof RESET_LOGIN_STATE;
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
  | LogoutFailureAction
  | ResetRegisterStateAction
  | ResetLoginStateAction;

// action creater functions
export const registerRequest = (data: RegisterRequestAction['data']): RegisterRequestAction => ({
  type: REGISTER_REQUEST,
  data,
});

export const registerSuccess = (payload: RegisterSuccessAction['payload']): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload,
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

export const logoutSuccess = (payload: LogoutSuccessAction['payload']): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
  payload,
});

export const logoutFailure = (error: string): LogoutFailureAction => ({
  type: LOGOUT_FAILURE,
  error,
});

export const resetRegisterState = (): ResetRegisterStateAction => ({
  type: RESET_REGISTER_STATE,
});

export const resetLoginState = (): ResetLoginStateAction => ({
  type: RESET_LOGIN_STATE,
});
