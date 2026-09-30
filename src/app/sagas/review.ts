import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
  GET_ALL_REVIEWS_OF_BOOK_REQUEST,
  GET_ALL_REVIEWS_OF_BOOK_SUCCESS,
  GET_ALL_REVIEWS_OF_BOOK_FAILURE,
  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_FAILURE,
  EDIT_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from '../actions/constants';
import { AddReviewRequestAction, DeleteReviewRequestAction, EditReviewRequestAction } from '../actions/types';

function getAllReviewsOfBookAPI(data: AddReviewRequestAction['data']) {
  return axios.get(`/review/${data.bookId}`);
}

export function* getAllReviewsOfBook(action: AddReviewRequestAction): SagaIterator {
  try {
    const response: any = yield call(getAllReviewsOfBookAPI, action.data);
    yield put({
      type: GET_ALL_REVIEWS_OF_BOOK_SUCCESS,
      payload: response.data.reviews,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_REVIEWS_OF_BOOK_FAILURE,
      error: err.response.data.message,
    });
  }
}

function addReviewAPI(data: AddReviewRequestAction['data']) {
  return axios.post(`/review/${data.bookId}`, data, {
    withCredentials: true,
  });
}

export function* addReview(action: AddReviewRequestAction): SagaIterator {
  try {
    const response: any = yield call(addReviewAPI, action.data);
    yield put({
      type: ADD_REVIEW_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: ADD_REVIEW_FAILURE,
      error: err.response.data.message,
    });
  }
}

function editReviewAPI(data: EditReviewRequestAction['data']) {
  return axios.put(`/review/${data.bookId}/${data.reviewId}`, data, {
    withCredentials: true,
  });
}

export function* editReview(action: EditReviewRequestAction): SagaIterator {
  try {
    const response: any = yield call(editReviewAPI, action.data);
    yield put({
      type: EDIT_REVIEW_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: EDIT_REVIEW_FAILURE,
      error: err.response.data.message,
    });
  }
}

function deleteReviewAPI(data: DeleteReviewRequestAction['data']) {
  return axios.delete(`/review/${data.bookId}/${data.reviewId}`, {
    withCredentials: true,
  });
}

export function* deleteReview(action: DeleteReviewRequestAction): SagaIterator {
  try {
    const response: any = yield call(deleteReviewAPI, action.data);
    yield put({
      type: DELETE_REVIEW_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: DELETE_REVIEW_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetAllReviewsOfBook() {
  yield takeLatest(GET_ALL_REVIEWS_OF_BOOK_REQUEST, getAllReviewsOfBook);
}

function* watchAddReview() {
  yield takeLatest(ADD_REVIEW_REQUEST, addReview);
}

function* watchEditReview() {
  yield takeLatest(EDIT_REVIEW_REQUEST, editReview);
}

function* watchDeleteReview() {
  yield takeLatest(DELETE_REVIEW_REQUEST, deleteReview);
}

export default function* bookSaga() {
  yield all([fork(watchAddReview), fork(watchGetAllReviewsOfBook), fork(watchEditReview), fork(watchDeleteReview)]);
}
