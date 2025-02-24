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
  GET_BOOKS_BY_GROUP_REQUEST,
  GET_BOOKS_BY_GROUP_SUCCESS,
  GET_BOOKS_BY_GROUP_FAILURE,
  GET_BOOKS_SEARCH_REQUEST,
  GET_BOOKS_SEARCH_SUCCESS,
  GET_BOOKS_SEARCH_FAILURE,
  GET_BOOK_ISBN_SEARCH_REQUEST,
  GET_BOOK_ISBN_SEARCH_SUCCESS,
  GET_BOOK_ISBN_SEARCH_FAILURE,
  GET_BOOKS_AUTHOR_SEARCH_REQUEST,
  GET_BOOKS_AUTHOR_SEARCH_SUCCESS,
  GET_BOOKS_AUTHOR_SEARCH_FAILURE,
  GET_MAINPAGE_BOOKS_REQUEST,
  GET_MAINPAGE_BOOKS_SUCCESS,
  GET_MAINPAGE_BOOKS_FAILURE,
  GET_MAINPAGE_BESTSELLER_BOOKS_REQUEST,
  GET_MAINPAGE_BESTSELLER_BOOKS_SUCCESS,
  GET_MAINPAGE_BESTSELLER_BOOKS_FAILURE,
  GET_BOOKS_BY_CATEGORY_REQUEST,
  GET_BOOKS_BY_CATEGORY_SUCCESS,
  GET_BOOKS_BY_CATEGORY_FAILURE,
} from '../actions/constants';
import {
  GetAllBooksRequestAction,
  GetBookRequestAction,
  GetBooksByGroupRequestAction,
  GetBooksSearchRequestAction,
  GetBookIsbnSearchRequestAction,
  GetBooksAuthorSearchRequestAction,
  GetMainpageBestSellerBooksRequestAction,
  GetBooksByCategoryRequestAction,
} from '../actions/types';

function getAllBooksAPI(page: number, pageSize: number) {
  return axios.get(`/book?page=${page}&pageSize=${pageSize}`);
}

export function* getAllBooks(action: GetAllBooksRequestAction): SagaIterator {
  try {
    const response: any = yield call(getAllBooksAPI, action.page, action.pageSize);
    yield put({
      type: GET_ALL_BOOKS_SUCCESS,
      payload: response.data.books,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_ALL_BOOKS_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBooksByGroupAPI(data: GetBooksByGroupRequestAction['data']) {
  return axios.get(`/book/${data.groupName}?page=${data.page}&pageSize=${data.pageSize}`);
}

export function* getBooksByGroup(action: GetBooksByGroupRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBooksByGroupAPI, action.data);
    yield put({
      type: GET_BOOKS_BY_GROUP_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOKS_BY_GROUP_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBooksByCategoryAPI(data: GetBooksByCategoryRequestAction['data']) {
  return axios.get(
    `/book/category/${data.categoryId}?page=${data.page}&pageSize=${data.pageSize}&orderTerm=${data.orderTerm}&categoryName=${data.categoryName}`,
  );
}

export function* getBooksByCategory(action: GetBooksByCategoryRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBooksByCategoryAPI, action.data);
    yield put({
      type: GET_BOOKS_BY_CATEGORY_SUCCESS,
      payload: response.data.books.rows,
      count: response.data.books.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOKS_BY_CATEGORY_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBooksSearchAPI(data: GetBooksSearchRequestAction['data']) {
  const queryString: string = new URLSearchParams({
    ...data,
  } as any).toString();

  return axios.get(`/book?${queryString}`);
}

export function* getBooksSearch(action: GetBooksSearchRequestAction): SagaIterator {
  try {
    const response: any = yield call(getBooksSearchAPI, action.data);

    yield put({
      type: GET_BOOKS_SEARCH_SUCCESS,
      payload: response.data.books,
      count: response.data.count,
    });
  } catch (err: any) {
    yield put({
      type: GET_BOOKS_SEARCH_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getBookIsbnSearchAPI(isbn: string) {
  return axios.get(`/book/search/isbn/${isbn}`);
}

export function* getBookIsbnSearch(action: GetBookIsbnSearchRequestAction): SagaIterator {
  try {
    if (!action.isbn) {
      return;
    }
    const response: any = yield call(getBookIsbnSearchAPI, action.isbn);
    yield put({
      type: GET_BOOK_ISBN_SEARCH_SUCCESS,
      payload: response.data.book,
    });
  } catch (error: any) {
    yield put({
      type: GET_BOOK_ISBN_SEARCH_FAILURE,
      error: error.response.data.message || 'Error occurred while fetching the book.',
    });
  }
}

function getBooksAuthorSearchAPI(author: string, bookId: number, page: number, pageSize: number) {
  return axios.get(`/book/search/author?author=${author}&bookId=${bookId}&page=${page}&pageSize=${pageSize}`);
}

export function* getBooksAuthorSearch(action: GetBooksAuthorSearchRequestAction): SagaIterator {
  try {
    if (!action.author) {
      return;
    }
    const response: any = yield call(getBooksAuthorSearchAPI, action.author, action.bookId, action.page, action.pageSize);
    yield put({
      type: GET_BOOKS_AUTHOR_SEARCH_SUCCESS,
      payload: response.data.books,
    });
  } catch (error: any) {
    yield put({
      type: GET_BOOKS_AUTHOR_SEARCH_FAILURE,
      error: error.response.data.message || 'Error occurred while fetching the book.',
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

function getMainpageBooksAPI() {
  return axios.get(`/book/mainpage`);
}

export function* getMainpageBooks(): SagaIterator {
  try {
    const response: any = yield call(getMainpageBooksAPI);
    yield put({
      type: GET_MAINPAGE_BOOKS_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_MAINPAGE_BOOKS_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getMainpageBestSellerBooksAPI(categoryId: number, page: number, pageSize: number) {
  return axios.get(`/book/mainpage/bestseller?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}`);
}

export function* getMainpageBestSellerBooks(action: GetMainpageBestSellerBooksRequestAction): SagaIterator {
  try {
    const response: any = yield call(getMainpageBestSellerBooksAPI, action.categoryId, action.page, action.pageSize);
    yield put({
      type: GET_MAINPAGE_BESTSELLER_BOOKS_SUCCESS,
      payload: response.data.books,
    });
  } catch (err: any) {
    yield put({
      type: GET_MAINPAGE_BESTSELLER_BOOKS_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetAllBooks() {
  yield takeLatest(GET_ALL_BOOKS_REQUEST, getAllBooks);
}

function* watchGetBooksByGroup() {
  yield takeLatest(GET_BOOKS_BY_GROUP_REQUEST, getBooksByGroup);
}

function* watchGetBooksByCategory() {
  yield takeLatest(GET_BOOKS_BY_CATEGORY_REQUEST, getBooksByCategory);
}

function* watchGetBooksSearch() {
  yield takeLatest(GET_BOOKS_SEARCH_REQUEST, getBooksSearch);
}

function* watchGetBookIsbnSearch() {
  yield takeLatest(GET_BOOK_ISBN_SEARCH_REQUEST, getBookIsbnSearch);
}

function* watchGetBooksAuthorSearch() {
  yield takeLatest(GET_BOOKS_AUTHOR_SEARCH_REQUEST, getBooksAuthorSearch);
}

function* watchGetBook() {
  yield takeLatest(GET_BOOK_REQUEST, getBook);
}

function* watchGetMainpageBooks() {
  yield takeLatest(GET_MAINPAGE_BOOKS_REQUEST, getMainpageBooks);
}

function* watchGetMainpageBestSellerBooks() {
  yield takeLatest(GET_MAINPAGE_BESTSELLER_BOOKS_REQUEST, getMainpageBestSellerBooks);
}

export default function* bookSaga() {
  yield all([
    fork(watchGetAllBooks),
    fork(watchGetBook),
    fork(watchGetBooksByGroup),
    fork(watchGetBooksSearch),
    fork(watchGetBookIsbnSearch),
    fork(watchGetBooksAuthorSearch),
    fork(watchGetMainpageBooks),
    fork(watchGetMainpageBestSellerBooks),
    fork(watchGetBooksByCategory),
  ]);
}
