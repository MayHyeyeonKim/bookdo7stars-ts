import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  MAKE_AN_ORDER_REQUEST,
  MAKE_AN_ORDER_SUCCESS,
  MAKE_AN_ORDER_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
} from '../actions/constants';
import { MakeAnOrderRequestAction, GetOrderHistoryRequestAction } from '../actions/types';

function makeAnOrderAPI(data: MakeAnOrderRequestAction['data']) {
  return axios.post('/order', data, {
    withCredentials: true,
  });
}

export function* makeAnOrder(action: MakeAnOrderRequestAction): SagaIterator {
  try {
    const response: any = yield call(makeAnOrderAPI, action.data);
    yield put({
      type: MAKE_AN_ORDER_SUCCESS,
      payload: response.data.orderNumber,
    });
  } catch (err: any) {
    yield put({
      type: MAKE_AN_ORDER_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getOrderHistoryRequestAPI(page: number, pageSize: number) {
  return axios.get(`/order/history?page=${page}&pageSize=${pageSize}`, {
    withCredentials: true, // 쿠키를 포함하여 서버에 요청
  });
}

export function* getOrderHistoryRequest(action: GetOrderHistoryRequestAction): SagaIterator {
  try {
    const response: any = yield call(getOrderHistoryRequestAPI, action.page, action.pageSize);
    console.log('response', response);
    yield put({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: response.data.orderHistory,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_ORDER_HISTORY_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchMakeAnOrder() {
  yield takeLatest(MAKE_AN_ORDER_REQUEST, makeAnOrder);
}

// Watchers
function* watchGetOrderHistoryRequest() {
  yield takeLatest(GET_ORDER_HISTORY_REQUEST, getOrderHistoryRequest);
}

export default function* orderSaga() {
  yield all([fork(watchMakeAnOrder), fork(watchGetOrderHistoryRequest)]);
}
