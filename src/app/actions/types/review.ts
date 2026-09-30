import { Review, ReviewDto } from '@/app/models/review';

import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  GET_ALL_REVIEWS_OF_BOOK_REQUEST,
  GET_ALL_REVIEWS_OF_BOOK_SUCCESS,
  GET_ALL_REVIEWS_OF_BOOK_FAILURE,
  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from '../constants';

export interface AddReviewRequestAction {
  type: typeof ADD_REVIEW_REQUEST;
  data: ReviewDto;
}

export interface AddReviewSuccessAction {
  type: typeof ADD_REVIEW_SUCCESS;
  payload: Review;
}

export interface AddReviewFailureAction {
  type: typeof ADD_REVIEW_FAILURE;
  error: string;
}

export interface EditReviewRequestAction {
  type: typeof EDIT_REVIEW_REQUEST;
  data: ReviewDto;
}

export interface EditReviewSuccessAction {
  type: typeof EDIT_REVIEW_SUCCESS;
  payload: Review;
}

export interface EditReviewFailureAction {
  type: typeof EDIT_REVIEW_FAILURE;
  error: string;
}

export interface DeleteReviewRequestAction {
  type: typeof DELETE_REVIEW_REQUEST;
  data: ReviewDto;
}

export interface DeleteReviewSuccessAction {
  type: typeof DELETE_REVIEW_SUCCESS;
}

export interface DeleteReviewFailureAction {
  type: typeof DELETE_REVIEW_FAILURE;
  error: string;
}

export interface GetAllReviewsOfBookRequestAction {
  type: typeof GET_ALL_REVIEWS_OF_BOOK_REQUEST;
  data: { bookId: number };
}

export interface GetAllReviewsOfBookSuccessAction {
  type: typeof GET_ALL_REVIEWS_OF_BOOK_SUCCESS;
  payload: Review[];
}

export interface GetAllReviewsOfBookFailureAction {
  type: typeof GET_ALL_REVIEWS_OF_BOOK_FAILURE;
  error: string;
}

export type ReviewActionTypes =
  | AddReviewRequestAction
  | AddReviewSuccessAction
  | AddReviewFailureAction
  | GetAllReviewsOfBookRequestAction
  | GetAllReviewsOfBookSuccessAction
  | GetAllReviewsOfBookFailureAction
  | EditReviewRequestAction
  | EditReviewSuccessAction
  | EditReviewFailureAction
  | DeleteReviewRequestAction
  | DeleteReviewSuccessAction
  | DeleteReviewFailureAction;

export const addReviewRequest = (data: AddReviewRequestAction['data']): AddReviewRequestAction => ({
  type: ADD_REVIEW_REQUEST,
  data: data,
});

export const addReviewSuccess = (review: Review): AddReviewSuccessAction => ({
  type: ADD_REVIEW_SUCCESS,
  payload: review,
});

export const addReviewFailure = (error: string): AddReviewFailureAction => ({
  type: ADD_REVIEW_FAILURE,
  error,
});

export const editReviewRequest = (data: EditReviewRequestAction['data']): EditReviewRequestAction => ({
  type: EDIT_REVIEW_REQUEST,
  data: data,
});

export const editReviewSuccess = (review: Review): EditReviewSuccessAction => ({
  type: EDIT_REVIEW_SUCCESS,
  payload: review,
});

export const editReviewFailure = (error: string): EditReviewFailureAction => ({
  type: EDIT_REVIEW_FAILURE,
  error,
});

export const deleteReviewRequest = (data: DeleteReviewRequestAction['data']): DeleteReviewRequestAction => ({
  type: DELETE_REVIEW_REQUEST,
  data: data,
});

export const deleteReviewSuccess = (): DeleteReviewSuccessAction => ({
  type: DELETE_REVIEW_SUCCESS,
});

export const deleteReviewFailure = (error: string): DeleteReviewFailureAction => ({
  type: DELETE_REVIEW_FAILURE,
  error,
});

export const getAllReviewsOfBookRequest = (data: GetAllReviewsOfBookRequestAction['data']): GetAllReviewsOfBookRequestAction => ({
  type: GET_ALL_REVIEWS_OF_BOOK_REQUEST,
  data: data,
});

export const getAllReviewsOfBookSuccess = (payload: GetAllReviewsOfBookSuccessAction['payload']): GetAllReviewsOfBookSuccessAction => ({
  type: GET_ALL_REVIEWS_OF_BOOK_SUCCESS,
  payload: payload,
});

export const getAllReviewsOfBookFailure = (error: string): GetAllReviewsOfBookFailureAction => ({
  type: GET_ALL_REVIEWS_OF_BOOK_FAILURE,
  error,
});
