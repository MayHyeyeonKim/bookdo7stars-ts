import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UserActionTypes,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions';
import { User } from '../models/user';

type InitialState = {
  isRegisterLoading: boolean;
  isRegisterDone: boolean;
  register_message: string | null;
  isRegisterError: string | null;
  isLoginLoading: boolean;
  isLoginDone: boolean;
  isLoginError: string | null;
  user: User | null;
  message: string | null;
};

export const initialState: InitialState = {
  isRegisterLoading: false,
  isRegisterDone: false,
  register_message: null,
  isRegisterError: null,
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: null,
  user: null,
  message: null,
};

function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isRegisterLoading: true };
    case REGISTER_SUCCESS:
      console.log('리듀서의 회원가입 REGISTER_SUCCESS에서 action.register_message:', action.register_message); // User registered successfully
      return { ...state, isRegisterLoading: false, isRegisterDone: true, register_message: action.register_message };
    case REGISTER_FAILURE:
      console.log('리듀서의 회원가입 Error payliad:', action.error);
      return { ...state, isRegisterError: action.error };

    case LOGIN_REQUEST:
      return { ...state, isLoginLoading: true };
    case LOGIN_SUCCESS:
      console.log('리듀서의 로그인에서 user 들어온 데이타:', action.payload);
      return { ...state, isLoginLoading: false, isLoginDone: true, user: action.payload };
    case LOGIN_FAILURE:
      console.log('리듀서의 로그인 Error payliad:', action.error);
      return { ...state, isLoginLoading: false, isLoginError: action.error };

    // case LOGOUT_REQUEST:
    //   return { ...state, isLoginLoading: true };
    case LOGOUT_SUCCESS:
      return { ...state, isLoginLoading: false, isLoginDone: false, user: null, message: action.payload };
    case LOGOUT_FAILURE:
      return { ...state, isLoginLoading: false, isLoginError: action.error, message: action.error };

    default:
      return state;
  }
}

export default userReducer;
