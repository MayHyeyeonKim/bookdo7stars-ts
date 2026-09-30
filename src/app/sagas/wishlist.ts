import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import {
  GET_WISHLIST_REQUEST,
  TOGGLE_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAILURE,
  TOGGLE_WISHLIST_SUCCESS,
  TOGGLE_WISHLIST_FAILURE,
} from '../actions/constants';
import { GetWishlistRequestAction, ToggleWishlistRequestAction } from '../actions/types';

function getWishlistRequestAPI(page: number, pageSize: number) {
  return axios.get(`/wishlist?page=${page}&pageSize=${pageSize}`, {
    withCredentials: true, // 쿠키를 포함하여 서버에 요청
  });
}

export function* getWishlistRequest(action: GetWishlistRequestAction): SagaIterator {
  try {
    const response: any = yield call(getWishlistRequestAPI, action.page, action.pageSize);
    yield put({
      type: GET_WISHLIST_SUCCESS,
      payload: response.data.wishlist,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_WISHLIST_FAILURE,
      error: err.response.data.message,
    });
  }
}

function toggleWishlistRequestAPI(bookId: ToggleWishlistRequestAction['bookId']) {
  return axios.post('/wishlist/toggle', { bookId: bookId });
}

function* toggleWishlistRequest(action: ToggleWishlistRequestAction): SagaIterator {
  try {
    const response: any = yield call(toggleWishlistRequestAPI, action.bookId);
    yield put({
      type: TOGGLE_WISHLIST_SUCCESS,
      payload: response.data.message,
    });
  } catch (err: any) {
    yield put({
      type: TOGGLE_WISHLIST_FAILURE,
      error: err.response.data.message,
    });
  }
}

// Watchers
function* watchGetWishlistRequest() {
  yield takeLatest(GET_WISHLIST_REQUEST, getWishlistRequest);
}

function* watchToggleWishlistRequest() {
  yield takeLatest(TOGGLE_WISHLIST_REQUEST, toggleWishlistRequest);
}

// Root Saga
export default function* userSaga() {
  yield all([fork(watchGetWishlistRequest), fork(watchToggleWishlistRequest)]);
}
