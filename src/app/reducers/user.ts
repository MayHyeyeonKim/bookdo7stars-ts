import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESET_REGISTER_STATE,
  RESET_LOGIN_STATE,
} from '../actions/constants';
import { UserActionTypes } from '../actions/types';
import { User } from '../models/user';
type InitialState = {
  isRegisterLoading: boolean;
  isRegisterDone: boolean;
  registerMessage: string | null;
  isRegisterError: string;
  isLoginLoading: boolean;
  isLoginDone: boolean;
  isLoginError: string;
  user: User | null;
  message: string | null;
  isLogoutDone: boolean;
  isLogoutError: string;
};

export const initialState: InitialState = {
  isRegisterLoading: false,
  isRegisterDone: false,
  registerMessage: null,
  isRegisterError: '',
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: '',
  user: null,
  message: null,
  isLogoutDone: false,
  isLogoutError: '',
};

function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isRegisterLoading: true };
    case REGISTER_SUCCESS:
      return { ...state, isRegisterLoading: false, isRegisterDone: true, registerMessage: action.payload };
    case REGISTER_FAILURE:
      return { ...state, isRegisterError: action.error };
    case RESET_REGISTER_STATE:
      return { ...state, registerMessage: null, isRegisterDone: false, isRegisterLoading: false, isRegisterError: '' };

    case LOGIN_REQUEST:
      return { ...state, isLoginLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoginLoading: false, isLoginDone: true, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, isLoginLoading: false, isLoginError: action.error };

    case LOGOUT_SUCCESS:
      return { ...state, isLogoutDone: true, user: null, message: action.payload };
    case LOGOUT_FAILURE:
      return { ...state, isLogoutError: action.error, message: action.error };

    case RESET_LOGIN_STATE:
      return { ...state, isLoginError: '', isLoginDone: false, isLoginLoading: false };
    default:
      return state;
  }
}

export default userReducer;
