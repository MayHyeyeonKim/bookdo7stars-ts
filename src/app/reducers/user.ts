import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, UserActionTypes } from '../actions';

type InitialState = {
  isRegisterLoading: boolean;
  isRegisterDone: boolean;
  isRegisterError: string;
};

export const initialState: InitialState = {
  isRegisterLoading: false,
  isRegisterDone: false,
  isRegisterError: '',
};

function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isRegisterLoading: true };
    case REGISTER_SUCCESS:
      return { ...state, isRegisterLoading: false, isRegisterDone: true };
    case REGISTER_FAILURE:
      return { ...state, isRegisterError: action.error };

    default:
      return state;
  }
}

export default userReducer;
