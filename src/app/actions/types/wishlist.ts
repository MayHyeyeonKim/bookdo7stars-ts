import { Wishlist } from '@/app/models/wishlist';

import {
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAILURE,
  TOGGLE_WISHLIST_REQUEST,
  TOGGLE_WISHLIST_SUCCESS,
  TOGGLE_WISHLIST_FAILURE,
} from '../constants';

export interface GetWishlistRequestAction {
  type: typeof GET_WISHLIST_REQUEST;
  page: number;
  pageSize: number;
}

export interface GetWishlistSuccessAction {
  type: typeof GET_WISHLIST_SUCCESS;
  payload: Wishlist[];
  count: number;
}

export interface GetWishlistFailureAction {
  type: typeof GET_WISHLIST_FAILURE;
  error: string;
}

export interface ToggleWishlistRequestAction {
  type: typeof TOGGLE_WISHLIST_REQUEST;
  bookId: number[];
}

export interface ToggleWishlistSuccessAction {
  type: typeof TOGGLE_WISHLIST_SUCCESS;
  payload: string;
}

export interface ToggleWishlistFailureAction {
  type: typeof TOGGLE_WISHLIST_FAILURE;
  error: string;
}

export type WishlistActionTypes =
  | GetWishlistRequestAction
  | GetWishlistSuccessAction
  | GetWishlistFailureAction
  | ToggleWishlistRequestAction
  | ToggleWishlistSuccessAction
  | ToggleWishlistFailureAction;

// action creater functions
export const getWishlistRequest = (page: number, pageSize: number): GetWishlistRequestAction => ({
  type: GET_WISHLIST_REQUEST,
  page,
  pageSize,
});

export const getWishlistSuccess = (payload: GetWishlistSuccessAction['payload'], count: GetWishlistSuccessAction['count']): GetWishlistSuccessAction => ({
  type: GET_WISHLIST_SUCCESS,
  payload,
  count,
});

export const getWishlistFailure = (error: string): GetWishlistFailureAction => ({
  type: GET_WISHLIST_FAILURE,
  error,
});

export const toggleWishlistRequest = (bookId: ToggleWishlistRequestAction['bookId']): ToggleWishlistRequestAction => ({
  type: TOGGLE_WISHLIST_REQUEST,
  bookId,
});

export const toggleWishlistSuccess = (payload: ToggleWishlistSuccessAction['payload']): ToggleWishlistSuccessAction => ({
  type: TOGGLE_WISHLIST_SUCCESS,
  payload,
});

export const toggleWishlistFailure = (error: string): ToggleWishlistFailureAction => ({
  type: TOGGLE_WISHLIST_FAILURE,
  error,
});
