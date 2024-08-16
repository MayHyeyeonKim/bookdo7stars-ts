import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UserActionTypes,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions';
import { User } from '../models/user';
type InitialState = {
  isRegisterLoading: boolean;
  isRegisterDone: boolean;
  isRegisterError: string | null;
  isLoginLoading: boolean;
  isLoginDone: boolean;
  isLoginError: string | null;
  user: User | null;
};

export const initialState: InitialState = {
  isRegisterLoading: false,
  isRegisterDone: false,
  isRegisterError: null,
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: null,
  user: null,
};

function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isRegisterLoading: true };
    case REGISTER_SUCCESS:
      return { ...state, isRegisterLoading: false, isRegisterDone: true };
    case REGISTER_FAILURE:
      console.log('리듀서의 회원가입 Error payliad:', action.error);
      return { ...state, isRegisterError: action.error };

    case LOGIN_REQUEST:
      return { ...state, isLoginLoading: true };
    case LOGIN_SUCCESS:
      console.log('리듀서의 로그인에서 user 들어온 데이타:', action.payload.user);
      return { ...state, isLoginLoading: false, isLoginDone: true, user: action.payload.user };
    case LOGIN_FAILURE:
      console.log('리듀서의 로그인 Error payliad:', action.error);
      return { ...state, isLoginLoading: false, isLoginError: action.error };

    case LOGOUT_REQUEST:
      return { ...state, isLoginLoading: true };
    case LOGOUT_SUCCESS:
      return { ...state, isLoginLoading: false, isLoginDone: false, user: null };
    case LOGOUT_FAILURE:
      return { ...state, isLoginLoading: false, isLoginError: action.error };

    default:
      return state;
  }
}

export default userReducer;
