import {
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAILURE,
  TOGGLE_WISHLIST_REQUEST,
  TOGGLE_WISHLIST_SUCCESS,
  TOGGLE_WISHLIST_FAILURE,
} from '../actions/constants';
import { WishlistActionTypes } from '../actions/types';
type InitialState = {
  isGetWishlistRequestLoading: boolean;
  isGetWishlistRequestDone: boolean;
  isGetWishlistRequestError: string;
  isToggleWishlistLoading: boolean;
  isToggleWishlistDone: boolean;
  isToggleWishlistError: string;
  wishlist: Array<any>;
};

export const initialState: InitialState = {
  isGetWishlistRequestLoading: false,
  isGetWishlistRequestDone: false,
  isGetWishlistRequestError: '',
  isToggleWishlistLoading: false,
  isToggleWishlistDone: false,
  isToggleWishlistError: '',
  wishlist: [],
};

function wishlistReducer(state = initialState, action: WishlistActionTypes) {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
      return { ...state, isGetWishlistRequestLoading: true };
    case GET_WISHLIST_SUCCESS:
      return { ...state, isGetWishlistRequestLoading: false, isGetWishlistRequestDone: true, wishlist: action.payload };
    case GET_WISHLIST_FAILURE:
      return { ...state, isGetWishlistRequestError: action.error };
    case TOGGLE_WISHLIST_REQUEST:
      return { ...state, isToggleWishlistLoading: true };
    case TOGGLE_WISHLIST_SUCCESS:
      return { ...state, isToggleWishlistLoading: false, isToggleWishlistDone: true, wishlist: action.payload };
    case TOGGLE_WISHLIST_FAILURE:
      return { ...state, isToggleWishlistLoading: false, isToggleWishlistError: action.error };
    default:
      return state;
  }
}

export default wishlistReducer;
