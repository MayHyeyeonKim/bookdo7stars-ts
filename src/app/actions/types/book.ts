import { Book } from '@/app/models/book';

import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOKS_BY_GROUP_FAILURE,
  GET_BOOKS_BY_GROUP_REQUEST,
  GET_BOOKS_BY_GROUP_SUCCESS,
  RESET_GROUP_BOOKS,
} from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

// All Books
export interface GetAllBooksRequestAction {
  type: typeof GET_ALL_BOOKS_REQUEST;
  page: number;
  pageSize: number;
}

export interface GetAllBooksSuccessAction {
  type: typeof GET_ALL_BOOKS_SUCCESS;
  payload: Book[];
  count: number;
}

export interface GetAllBooksFailureAction {
  type: typeof GET_ALL_BOOKS_FAILURE;
  error: string;
}

export interface GetBooksByGroupRequestAction {
  type: typeof GET_BOOKS_BY_GROUP_REQUEST;
  data: { groupName: string; page?: number; pageSize?: number };
}

export interface GetBooksByGroupSuccessAction {
  type: typeof GET_BOOKS_BY_GROUP_SUCCESS;
  payload: Book[];
}

export interface GetBooksByGroupFailureAction {
  type: typeof GET_BOOKS_BY_GROUP_FAILURE;
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

export interface ResetGroupBooksAction {
  type: typeof RESET_GROUP_BOOKS;
}

//Union type
export type BookActionTypes =
  | GetAllBooksRequestAction
  | GetAllBooksSuccessAction
  | GetAllBooksFailureAction
  | GetBooksByGroupRequestAction
  | GetBooksByGroupSuccessAction
  | GetBooksByGroupFailureAction
  | GetBookRequestAction
  | GetBookSuccessAction
  | GetBookFailureAction
  | ResetGroupBooksAction;

// Action creater

//All Books
export const getAllBooksRequest = (page: number, pageSize: number): GetAllBooksRequestAction => ({
  type: GET_ALL_BOOKS_REQUEST,
  page,
  pageSize,
});

export const getAllBooksSuccess = (payload: GetAllBooksSuccessAction['payload'], count: GetAllBooksSuccessAction['count']): GetAllBooksSuccessAction => ({
  type: GET_ALL_BOOKS_SUCCESS,
  payload,
  count,
});

export const getAllBooksFailure = (error: string): GetAllBooksFailureAction => ({
  type: GET_ALL_BOOKS_FAILURE,
  error,
});

//Books By Group
export const getBooksByGroupRequest = (data: GetBooksByGroupRequestAction['data']): GetBooksByGroupRequestAction => ({
  type: GET_BOOKS_BY_GROUP_REQUEST,
  data,
});

export const getBooksByGroupSuccess = (payload: GetBooksByGroupSuccessAction['payload']): GetBooksByGroupSuccessAction => ({
  type: GET_BOOKS_BY_GROUP_SUCCESS,
  payload,
});

export const getBooksByGroupFailure = (error: string): GetBooksByGroupFailureAction => ({
  type: GET_BOOKS_BY_GROUP_FAILURE,
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

export const resetGroupBooks = (): ResetGroupBooksAction => ({
  type: RESET_GROUP_BOOKS,
});
