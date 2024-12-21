import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_ITEMS_IN_CART_REQUEST,
  GET_ITEMS_IN_CART_FAILURE,
  GET_ITEMS_IN_CART_SUCCESS,
} from '../actions/constants';
import { CartActionTypes } from '../actions/types';
import { CartItem } from '../models/cart';

interface CartState {
  items: CartItem[];
  addedItem: CartItem | null;
  totalItems: number;
  totalPrice: number;
  isAddToCartLoading: boolean;
  isAddToCartDone: boolean;
  isAddToCartError: string;
  isGetItemsInCartLoading: boolean;
  isGetItemsInCartDone: boolean;
  isGetItemsInCartError: string;
  addToCartSuccessMessage: string | null;
  addToCartFailureMessage: string;
}
const initialCartState: CartState = {
  items: [],
  addedItem: null,
  totalItems: 0,
  totalPrice: 0,
  isGetItemsInCartLoading: false,
  isGetItemsInCartDone: false,
  isGetItemsInCartError: '',
  isAddToCartLoading: false,
  isAddToCartDone: false,
  isAddToCartError: '',
  addToCartSuccessMessage: null,
  addToCartFailureMessage: '',
};
function cartReducer(state = initialCartState, action: CartActionTypes): CartState {
  switch (action.type) {
    case GET_ITEMS_IN_CART_REQUEST:
      return { ...state, isGetItemsInCartLoading: true };

    case GET_ITEMS_IN_CART_SUCCESS: {
      return { ...state, isGetItemsInCartLoading: false, isGetItemsInCartDone: true, items: action.payload };
    }

    case GET_ITEMS_IN_CART_FAILURE:
      return { ...state, isGetItemsInCartLoading: false, isAddToCartError: action.error };

    case ADD_TO_CART_REQUEST:
      return { ...state, isAddToCartLoading: true, isAddToCartDone: false };

    case ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        isAddToCartLoading: false,
        isAddToCartDone: true,
        addedItem: action.payload.cartItem,
        addToCartSuccessMessage: action.payload.message,
      };
    }

    case ADD_TO_CART_FAILURE:
      console.log(action.error);
      return { ...state, isAddToCartLoading: false, isAddToCartDone: false, isAddToCartError: action.error };

    // case REMOVE_FROM_CART: {
    //   const updatedItems = state.items.filter((item) => item.id !== action.payload);

    //   const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    //   const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    //   return { ...state, items: updatedItems, totalItems, totalPrice };
    // }

    // case UPDATE_CART_ITEM_QUANTITY: {
    //   const { bookId, quantity } = action.payload;

    //   const updatedItems = state.items.map((item) => (item.id === bookId ? { ...item, quantity } : item));

    //   const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    //   const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    //   return { ...state, items: updatedItems, totalItems, totalPrice };
    // }

    // case CLEAR_CART:
    //   return { ...initialCartState };

    default:
      return state;
  }
}

export default cartReducer;
