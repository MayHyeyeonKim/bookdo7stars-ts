import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { GET_ALL_BOOKS_FAILURE, GET_ALL_BOOKS_REQUEST, GET_ALL_BOOKS_SUCCESS } from '../actions/constants';

function getAllBooksAPI() {
  return axios.get('/book');
}

function* getAllBooks(): SagaIterator {
  try {
    const response: any = yield call(getAllBooksAPI);
    yield put({
      type: GET_ALL_BOOKS_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_BOOKS_FAILURE,
      payload: err.response.data.message,
    });
  }
}

function* watchGetAllBooks() {
  yield takeLatest(GET_ALL_BOOKS_REQUEST, getAllBooks);
}

export default function* bookSaga() {
  yield all([fork(watchGetAllBooks)]);
}
