import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_ITEMS_IN_CART_REQUEST,
  GET_ITEMS_IN_CART_FAILURE,
  GET_ITEMS_IN_CART_SUCCESS,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  SET_QUANTITY_IN_LOCALSTORAGE,
  SET_SELECTED_ITEMS_FOR_ORDER,
  SET_TOTAL_PRICE,
} from '../actions/constants';
import { CartActionTypes } from '../actions/types';
import { CartItem } from '../models/cart';

interface CartState {
  items: CartItem[];
  addedItem: CartItem[];
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
  isUpdateCartItemLoading: boolean;
  isUpdateCartItemDone: boolean;
  isUpdateCartItemError: string;
  isDeleteCartItemLoading: boolean;
  isDeleteCartItemDone: boolean;
  isDeleteCartItemError: string;
  selectedItems: CartItem[];
}
const initialCartState: CartState = {
  items: [],
  addedItem: [],
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
  isUpdateCartItemLoading: false,
  isUpdateCartItemDone: false,
  isUpdateCartItemError: '',
  isDeleteCartItemLoading: false,
  isDeleteCartItemDone: false,
  isDeleteCartItemError: '',
  selectedItems: [],
};
function cartReducer(state = initialCartState, action: CartActionTypes): CartState {
  switch (action.type) {
    case GET_ITEMS_IN_CART_REQUEST:
      return { ...state, isGetItemsInCartLoading: true };

    case GET_ITEMS_IN_CART_SUCCESS: {
      const cartItems = action.payload;
      cartItems.sort((a, b) => a.book.id - b.book.id);
      return { ...state, isGetItemsInCartLoading: false, isGetItemsInCartDone: true, items: cartItems, totalItems: action.payload.length };
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
        addedItem: action.payload.cartItems,
        addToCartSuccessMessage: action.payload.message,
      };
    }

    case ADD_TO_CART_FAILURE:
      return { ...state, isAddToCartLoading: false, isAddToCartDone: false, isAddToCartError: action.error };

    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, isUpdateCartItemLoading: true, isUpdateCartItemDone: false };

    case UPDATE_CART_ITEM_SUCCESS: {
      return {
        ...state,
        isUpdateCartItemLoading: false,
        isUpdateCartItemDone: true,
      };
    }

    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, isUpdateCartItemLoading: false, isUpdateCartItemDone: false, isUpdateCartItemError: action.error };

    case DELETE_CART_ITEM_REQUEST:
      return { ...state, isDeleteCartItemLoading: true, isDeleteCartItemDone: false };

    case DELETE_CART_ITEM_SUCCESS: {
      return {
        ...state,
        isDeleteCartItemLoading: false,
        isDeleteCartItemDone: true,
      };
    }

    case DELETE_CART_ITEM_FAILURE:
      return { ...state, isDeleteCartItemLoading: false, isDeleteCartItemDone: false, isDeleteCartItemError: action.error };

    case SET_QUANTITY_IN_LOCALSTORAGE: {
      return { ...state, totalItems: action.data.totalItems };
    }

    case SET_SELECTED_ITEMS_FOR_ORDER: {
      return { ...state, selectedItems: action.data };
    }

    case SET_TOTAL_PRICE: {
      return { ...state, totalPrice: action.data };
    }

    default:
      return state;
  }
}

export default cartReducer;
