import { OrderContent, OrderHistory } from '@/app/models/order';

import {
  MAKE_AN_ORDER_FAILURE,
  MAKE_AN_ORDER_REQUEST,
  MAKE_AN_ORDER_SUCCESS,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
} from '../constants/order';

export interface MakeAnOrderRequestAction {
  type: typeof MAKE_AN_ORDER_REQUEST;
  data: OrderContent;
}

export interface MakeAnOrderSuccessAction {
  type: typeof MAKE_AN_ORDER_SUCCESS;
  payload: string;
}

export interface MakeAnOrderFailureAction {
  type: typeof MAKE_AN_ORDER_FAILURE;
  error: string;
}

export interface GetOrderHistoryRequestAction {
  type: typeof GET_ORDER_HISTORY_REQUEST;
  page: number;
  pageSize: number;
}

export interface GetOrderHistorySuccessAction {
  type: typeof GET_ORDER_HISTORY_SUCCESS;
  payload: OrderHistory[];
  count: number;
}

export interface GetOrderHistoryFailureAction {
  type: typeof GET_ORDER_HISTORY_FAILURE;
  error: string;
}

export type OrderActionTypes =
  | MakeAnOrderRequestAction
  | MakeAnOrderSuccessAction
  | MakeAnOrderFailureAction
  | GetOrderHistoryRequestAction
  | GetOrderHistorySuccessAction
  | GetOrderHistoryFailureAction;

export const makeAnOrderRequest = (data: MakeAnOrderRequestAction['data']): MakeAnOrderRequestAction => ({
  type: MAKE_AN_ORDER_REQUEST,
  data,
});

export const makeAnOrderSuccess = (payload: MakeAnOrderSuccessAction['payload']): MakeAnOrderSuccessAction => ({
  type: MAKE_AN_ORDER_SUCCESS,
  payload: payload,
});

export const makeAnOrderFailure = (error: string): MakeAnOrderFailureAction => ({
  type: MAKE_AN_ORDER_FAILURE,
  error,
});

export const getOrderHistoryRequest = (page: number, pageSize: number): GetOrderHistoryRequestAction => ({
  type: GET_ORDER_HISTORY_REQUEST,
  page,
  pageSize,
});

export const getOrderHistorySuccess = (
  payload: GetOrderHistorySuccessAction['payload'],
  count: GetOrderHistorySuccessAction['count'],
): GetOrderHistorySuccessAction => ({
  type: GET_ORDER_HISTORY_SUCCESS,
  payload,
  count,
});

export const getOrderHistoryFailure = (error: string): GetOrderHistoryFailureAction => ({
  type: GET_ORDER_HISTORY_FAILURE,
  error,
});
