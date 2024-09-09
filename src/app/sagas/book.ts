import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOKS_GROUPNAME_REQUEST,
  GET_BOOKS_GROUPNAME_SUCCESS,
  GET_BOOKS_GROUPNAME_FAILURE,
} from '../actions/constants';
import { GetBookRequestAction } from '../actions/types';
import { GetBooksByGroupNameRequestAction } from '../actions/types/book';

function getAllBooksAPI() {
  return axios.get('/book');
}

export function* getAllBooks(): SagaIterator {
  try {
    const response: any = yield call(getAllBooksAPI);
    yield put({
      type: GET_ALL_BOOKS_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_BOOKS_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBookAPI(id: GetBookRequestAction['data']) {
  return axios.get(`/book/detail/${id}`);
}

export function* getBook(action: GetBookRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBookAPI, action.data);
    yield put({
      type: GET_BOOK_SUCCESS,
      payload: response.data.book,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOK_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBooksByGroupNameAPI(groupName: string, page: number, pageSize: number) {
  return axios.get(`/book/${groupName}?page=${page}&pageSize=${pageSize}`);
}

export function* getBooksByGroupName(action: GetBooksByGroupNameRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBooksByGroupNameAPI, action.groupName, action.page, action.pageSize);
    console.log(`사가에서 ${action.groupName} 받아온 책:`, response);

    yield put({
      type: GET_BOOKS_GROUPNAME_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOKS_GROUPNAME_FAILURE,
      error: err?.response?.data?.message,
    });
  }
}

function* watchGetAllBooks() {
  yield takeLatest(GET_ALL_BOOKS_REQUEST, getAllBooks);
}

function* watchGetBook() {
  yield takeLatest(GET_BOOK_REQUEST, getBook);
}

function* watchGetBooksByGroupName() {
  yield takeLatest(GET_BOOKS_GROUPNAME_REQUEST, getBooksByGroupName);
}

export default function* bookSaga() {
  yield all([fork(watchGetAllBooks), fork(watchGetBook), fork(watchGetBooksByGroupName)]);
}
