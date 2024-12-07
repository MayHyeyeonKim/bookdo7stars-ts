import { Category } from '@/app/models/category';

import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE } from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

export interface GetCategoryRequestAction {
  type: typeof GET_CATEGORY_REQUEST;
  level: number;
}

export interface GetCategorySuccessAction {
  type: typeof GET_CATEGORY_SUCCESS;
  payload: Category[];
}

export interface GetCategoryFailureAction {
  type: typeof GET_CATEGORY_FAILURE;
  error: string;
}

//Union type
export type CategoryActionTypes = GetCategoryRequestAction | GetCategorySuccessAction | GetCategoryFailureAction;

export const getCategoryRequest = (level: number): GetCategoryRequestAction => ({
  type: GET_CATEGORY_REQUEST,
  level,
});

export const getCategorySuccess = (payload: GetCategorySuccessAction['payload']): GetCategorySuccessAction => ({
  type: GET_CATEGORY_SUCCESS,
  payload,
});

export const getCategoryFailure = (error: string): GetCategoryFailureAction => ({
  type: GET_CATEGORY_FAILURE,
  error,
});
