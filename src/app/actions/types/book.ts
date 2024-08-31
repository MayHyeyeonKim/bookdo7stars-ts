import { Book } from '@/app/models/book';

import { GET_ALL_BOOKS_FAILURE, GET_ALL_BOOKS_REQUEST, GET_ALL_BOOKS_SUCCESS } from '../constants';

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

export type BookActionTypes = GetAllBooksRequestAction | GetAllBooksSuccessAction | GetAllBooksFailureAction;

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
