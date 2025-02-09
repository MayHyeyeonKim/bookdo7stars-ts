import { CartItem, CartItemDto } from '@/app/models/cart';

import {
  GET_ITEMS_IN_CART_SUCCESS,
  GET_ITEMS_IN_CART_REQUEST,
  GET_ITEMS_IN_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  SET_QUANTITY_IN_LOCALSTORAGE,
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
  data: CartItemDto[];
}

export interface AddToCartSuccessAction {
  type: typeof ADD_TO_CART_SUCCESS;
  payload: { cartItems: CartItem[]; message: string };
}

export interface AddToCartFailureAction {
  type: typeof ADD_TO_CART_FAILURE;
  error: string;
}

export interface UpdateCartItemRequestAction {
  type: typeof UPDATE_CART_ITEM_REQUEST;
  data: { bookId: string; quantity: number };
}

export interface UpdateCartItemSuccessAction {
  type: typeof UPDATE_CART_ITEM_SUCCESS;
  payload: { cartItem: CartItem; message: string };
}

export interface UpdateCartItemFailureAction {
  type: typeof UPDATE_CART_ITEM_FAILURE;
  error: string;
}

export interface DeleteCartItemRequestAction {
  type: typeof DELETE_CART_ITEM_REQUEST;
  data: { bookId: string };
}

export interface DeleteCartItemSuccessAction {
  type: typeof DELETE_CART_ITEM_SUCCESS;
}

export interface DeleteCartItemFailureAction {
  type: typeof DELETE_CART_ITEM_FAILURE;
  error: string;
}

export interface SetQuantityInLocalstorageAction {
  type: typeof SET_QUANTITY_IN_LOCALSTORAGE;
  data: { totalItems: number };
}

export type CartActionTypes =
  | GetItemsInCartRequestAction
  | GetItemsInCartSuccessAction
  | GetItemsInCartFailureAction
  | AddToCartRequestAction
  | AddToCartSuccessAction
  | AddToCartFailureAction
  | UpdateCartItemRequestAction
  | UpdateCartItemSuccessAction
  | UpdateCartItemFailureAction
  | DeleteCartItemRequestAction
  | DeleteCartItemSuccessAction
  | DeleteCartItemFailureAction
  | SetQuantityInLocalstorageAction;

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

export const updateCartItemRequest = (data: UpdateCartItemRequestAction['data']): UpdateCartItemRequestAction => ({
  type: UPDATE_CART_ITEM_REQUEST,
  data: data,
});

export const updateCartItemSuccess = (payload: UpdateCartItemSuccessAction['payload']): UpdateCartItemSuccessAction => ({
  type: UPDATE_CART_ITEM_SUCCESS,
  payload: payload,
});

export const updateCartItemFailure = (error: string): UpdateCartItemFailureAction => ({
  type: UPDATE_CART_ITEM_FAILURE,
  error,
});

export const deleteCartItemRequest = (data: DeleteCartItemRequestAction['data']): DeleteCartItemRequestAction => ({
  type: DELETE_CART_ITEM_REQUEST,
  data: data,
});

export const deleteCartItemSuccess = (): DeleteCartItemSuccessAction => ({
  type: DELETE_CART_ITEM_SUCCESS,
});

export const deleteCartItemFailure = (error: string): DeleteCartItemFailureAction => ({
  type: DELETE_CART_ITEM_FAILURE,
  error,
});

export const setQuantityInLocalstorage = (data: SetQuantityInLocalstorageAction['data']): SetQuantityInLocalstorageAction => ({
  type: SET_QUANTITY_IN_LOCALSTORAGE,
  data,
});
