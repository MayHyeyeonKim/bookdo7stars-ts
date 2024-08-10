import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '..';

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

export type UserActionTypes = RegisterRequestAction | RegisterSuccessAction | RegisterFailureAction;

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
