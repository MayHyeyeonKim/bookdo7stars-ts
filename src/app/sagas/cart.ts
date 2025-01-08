import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_ITEMS_IN_CART_REQUEST,
  GET_ITEMS_IN_CART_SUCCESS,
  GET_ITEMS_IN_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
} from '../actions/constants';
import { AddToCartRequestAction, RemoveFromCartRequestAction } from '../actions/types';

function getItemsInCartAPI() {
  return axios.get('/cart', { withCredentials: true });
}

export function* getItemsInCart(): SagaIterator {
  try {
    const response: any = yield call(getItemsInCartAPI);
    yield put({
      type: GET_ITEMS_IN_CART_SUCCESS,
      payload: response.data.cartItems,
    });
  } catch (err: any) {
    yield put({
      type: GET_ITEMS_IN_CART_FAILURE,
      error: err.response.data.message,
    });
  }
}

function addToCartAPI(data: AddToCartRequestAction['data']) {
  return axios.post('/cart', data, {
    withCredentials: true,
  });
}

export function* addToCart(action: AddToCartRequestAction): SagaIterator {
  try {
    const response: any = yield call(addToCartAPI, action.data);
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: ADD_TO_CART_FAILURE,
      error: err.response.data.message,
    });
  }
}

function removeFromCartAPI(data: RemoveFromCartRequestAction['data']) {
  return axios.delete(`cart/${data}`);
}

export function* removeFromCart(action: RemoveFromCartRequestAction): SagaIterator {
  try {
    const response: any = yield call(removeFromCartAPI, action.data);
    yield put({
      type: REMOVE_FROM_CART_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: REMOVE_FROM_CART_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetItemsInCart() {
  yield takeLatest(GET_ITEMS_IN_CART_REQUEST, getItemsInCart);
}

function* watchAddCart() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
}

function* watchRemoveFromCart() {
  yield takeLatest(REMOVE_FROM_CART_REQUEST, removeFromCart);
}

export default function* bookSaga() {
  yield all([fork(watchAddCart), fork(watchGetItemsInCart), fork(watchRemoveFromCart)]);
}
