import { Book } from '@/app/models/book';

import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOKS_GROUPNAME_REQUEST,
  GET_BOOKS_GROUPNAME_SUCCESS,
  GET_BOOKS_GROUPNAME_FAILURE,
  RESET_BOOKS,
} from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

export interface ResetBooksAction {
  type: typeof RESET_BOOKS;
}

// All Books
export interface GetAllBooksRequestAction {
  type: typeof GET_ALL_BOOKS_REQUEST;
}

export interface GetAllBooksSuccessAction {
  type: typeof GET_ALL_BOOKS_SUCCESS;
  payload: Book[];
}

export interface GetAllBooksFailureAction {
  type: typeof GET_ALL_BOOKS_FAILURE;
  error: string;
}

// Book Detail
export interface GetBookRequestAction {
  type: typeof GET_BOOK_REQUEST;
  data: string;
}

export interface GetBookSuccessAction {
  type: typeof GET_BOOK_SUCCESS;
  payload: string;
}

export interface GetBookFailureAction {
  type: typeof GET_BOOK_FAILURE;
  error: string;
}

//Books by Group Name
export interface GetBooksByGroupNameRequestAction {
  type: typeof GET_BOOKS_GROUPNAME_REQUEST;
  groupName: string;
  page: number;
  pageSize: number;
}

export interface GetBooksByGroupNameSuccessAction {
  type: typeof GET_BOOKS_GROUPNAME_SUCCESS;
  payload: Book[];
}

export interface GetBooksByGroupNameFailureAction {
  type: typeof GET_BOOKS_GROUPNAME_FAILURE;
  error: string;
}

//Union type
export type BookActionTypes =
  | GetAllBooksRequestAction
  | GetAllBooksSuccessAction
  | GetAllBooksFailureAction
  | GetBookRequestAction
  | GetBookSuccessAction
  | GetBookFailureAction
  | GetBooksByGroupNameRequestAction
  | GetBooksByGroupNameSuccessAction
  | GetBooksByGroupNameFailureAction
  | ResetBooksAction;

// Action creater

//All Books
export const getAllBooksRequest = (): GetAllBooksRequestAction => ({
  type: GET_ALL_BOOKS_REQUEST,
});

export const getAllBooksSuccess = (payload: GetAllBooksSuccessAction['payload']): GetAllBooksSuccessAction => ({
  type: GET_ALL_BOOKS_SUCCESS,
  payload,
});

export const getAllBooksFailure = (error: string): GetAllBooksFailureAction => ({
  type: GET_ALL_BOOKS_FAILURE,
  error,
});

//Book Detail
export const getBookRequest = (data: GetBookRequestAction['data']): GetBookRequestAction => ({
  type: GET_BOOK_REQUEST,
  data,
});

export const getBookSuccess = (payload: GetBookSuccessAction['payload']): GetBookSuccessAction => ({
  type: GET_BOOK_SUCCESS,
  payload,
});

export const getBookFailure = (error: string): GetBookFailureAction => ({
  type: GET_BOOK_FAILURE,
  error,
});

// All books by Group Name
export const getBooksByGroupNameRequest = (groupName: string, page: number, pageSize: number): GetBooksByGroupNameRequestAction => ({
  type: GET_BOOKS_GROUPNAME_REQUEST,
  groupName,
  page,
  pageSize,
});

export const getBooksByGroupNameSuccess = (payload: GetBooksByGroupNameSuccessAction['payload']): GetBooksByGroupNameSuccessAction => ({
  type: GET_BOOKS_GROUPNAME_SUCCESS,
  payload,
});

export const getBooksByGroupNameFailure = (error: string): GetBooksByGroupNameFailureAction => ({
  type: GET_BOOKS_GROUPNAME_FAILURE,
  error,
});

//reset books
export const resetBooks = (): ResetBooksAction => ({
  type: RESET_BOOKS,
});
