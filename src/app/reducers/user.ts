import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, UserActionTypes } from '../actions';
import { User } from '../models/user';
type InitialState = {
  isRegisterLoading: boolean;
  isRegisterDone: boolean;
  isRegisterError: string;
  isLoginLoading: boolean;
  isLoginDone: boolean;
  isLoginError: string;
  user: User;
};

export const initialState: InitialState = {
  isRegisterLoading: false,
  isRegisterDone: false,
  isRegisterError: '',
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: '',
  user: { name: '', grade: '' },
};

function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isRegisterLoading: true };
    case REGISTER_SUCCESS:
      return { ...state, isRegisterLoading: false, isRegisterDone: true };
    case REGISTER_FAILURE:
      return { ...state, isRegisterError: action.error };

    case LOGIN_REQUEST:
      return { ...state, isLoginLoading: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoginLoading: false, isLoginDone: true, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, isLoginLoading: false, isLoginError: action.error };

    default:
      return state;
  }
}

export default userReducer;
