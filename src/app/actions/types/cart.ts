import { CartItem } from '@/app/models/cart';

import {
  GET_ITEMS_IN_CART_SUCCESS,
  GET_ITEMS_IN_CART_REQUEST,
  GET_ITEMS_IN_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
} from '../constants';

export interface GetItemsInCartRequestAction {
  type: typeof GET_ITEMS_IN_CART_REQUEST;
}

export interface GetItemsInCartSuccessAction {
  type: typeof GET_ITEMS_IN_CART_SUCCESS;
  payload: CartItem[];
}

export interface GetItemsInCartFailureAction {
  type: typeof GET_ITEMS_IN_CART_FAILURE;
  error: string;
}

export interface AddToCartRequestAction {
  type: typeof ADD_TO_CART_REQUEST;
  data: { bookId: number; quantity: number };
}

export interface AddToCartSuccessAction {
  type: typeof ADD_TO_CART_SUCCESS;
  payload: { cartItem: CartItem; message: string };
}

export interface AddToCartFailureAction {
  type: typeof ADD_TO_CART_FAILURE;
  error: string;
}

// export interface RemoveFromCartAction {
//   type: typeof REMOVE_FROM_CART;
//   payload: string; // Book ID
// }

// export interface UpdateCartItemQuantityAction {
//   type: typeof UPDATE_CART_ITEM_QUANTITY;
//   payload: {
//     bookId: string;
//     quantity: number;
//   };
// }

// export interface ClearCartAction {
//   type: typeof CLEAR_CART;
// }

export type CartActionTypes =
  | GetItemsInCartRequestAction
  | GetItemsInCartSuccessAction
  | GetItemsInCartFailureAction
  | AddToCartRequestAction
  | AddToCartSuccessAction
  | AddToCartFailureAction;

export const getItemsInCartRequest = (): GetItemsInCartRequestAction => ({
  type: GET_ITEMS_IN_CART_REQUEST,
});

export const getItemsInCartSuccess = (cartItems: CartItem[]): GetItemsInCartSuccessAction => ({
  type: GET_ITEMS_IN_CART_SUCCESS,
  payload: cartItems,
});

export const getItemsInCartFailure = (error: string): GetItemsInCartFailureAction => ({
  type: GET_ITEMS_IN_CART_FAILURE,
  error,
});

export const addToCartRequest = (data: AddToCartRequestAction['data']): AddToCartRequestAction => ({
  type: ADD_TO_CART_REQUEST,
  data: data,
});

export const addToCartSuccess = (payload: AddToCartSuccessAction['payload']): AddToCartSuccessAction => ({
  type: ADD_TO_CART_SUCCESS,
  payload: payload,
});

export const addToCartFailure = (error: string): AddToCartFailureAction => ({
  type: ADD_TO_CART_FAILURE,
  error,
});

// export const removeFromCart = (bookId: string): RemoveFromCartAction => ({
//   type: REMOVE_FROM_CART,
//   payload: bookId,
// });

// export const updateCartItemQuantity = (bookId: string, quantity: number): UpdateCartItemQuantityAction => ({
//   type: UPDATE_CART_ITEM_QUANTITY,
//   payload: { bookId, quantity },
// });

// export const clearCart = (): ClearCartAction => ({
//   type: CLEAR_CART,
// });
