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
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
} from '../actions/constants';
import { AddToCartRequestAction, UpdateCartItemRequestAction } from '../actions/types';

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

function updateCartItemAPI(data: UpdateCartItemRequestAction['data']) {
  return axios.put(`/cart/${data.bookId}`, data, {
    withCredentials: true,
  });
}

export function* updateCartItem(action: UpdateCartItemRequestAction): SagaIterator {
  try {
    const response: any = yield call(updateCartItemAPI, action.data);
    yield put({
      type: UPDATE_CART_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: UPDATE_CART_ITEM_FAILURE,
      error: err.response.data.message,
    });
  }
}

function deleteCartItemAPI(data: UpdateCartItemRequestAction['data']) {
  return axios.delete(`/cart/${data.bookId}`, {
    withCredentials: true,
  });
}

export function* deleteCartItem(action: UpdateCartItemRequestAction): SagaIterator {
  try {
    yield call(deleteCartItemAPI, action.data);
    yield put({
      type: DELETE_CART_ITEM_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: DELETE_CART_ITEM_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchDeleteCartItem() {
  yield takeLatest(DELETE_CART_ITEM_REQUEST, deleteCartItem);
}

function* watchUpdateCartItem() {
  yield takeLatest(UPDATE_CART_ITEM_REQUEST, updateCartItem);
}

function* watchGetItemsInCart() {
  yield takeLatest(GET_ITEMS_IN_CART_REQUEST, getItemsInCart);
}

function* watchAddCart() {
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
}

export default function* cartSaga() {
  yield all([fork(watchAddCart), fork(watchGetItemsInCart), fork(watchUpdateCartItem), fork(watchDeleteCartItem)]);
}
