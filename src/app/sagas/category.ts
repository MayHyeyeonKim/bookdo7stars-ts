import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  GET_CATEGORIES_BY_ID_REQUEST,
  GET_CATEGORIES_BY_ID_FAILURE,
  GET_CATEGORIES_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_FAILURE,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_REQUEST,
} from '../actions/constants';
import { GetCategoriesByIdRequestAction, GetCategoryRequestAction } from '../actions/types';

function GetCategoryByIdAPI(id: string) {
  return axios.get(`/category/${id}`);
}

export function* GetCategoryById(action: GetCategoriesByIdRequestAction): SagaIterator {
  try {
    const response: any = yield call(GetCategoryByIdAPI, action.id);
    yield put({
      type: GET_CATEGORY_BY_ID_SUCCESS,
      payload: response.data.category,
    });
  } catch (err: any) {
    yield put({
      type: GET_CATEGORY_BY_ID_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getCategoriesByIdAPI(id: string) {
  return axios.get(`/category/categoriesMap/${id}`);
}

export function* getCategoriesById(action: GetCategoriesByIdRequestAction): SagaIterator {
  try {
    const response: any = yield call(getCategoriesByIdAPI, action.id);
    yield put({
      type: GET_CATEGORIES_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: GET_CATEGORIES_BY_ID_FAILURE,
      error: err.response.data.message,
    });
  }
}

function getCategoriesAPI(level: number) {
  return axios.get(`/category?level=${level}`);
}

export function* getCategories(action: GetCategoryRequestAction): SagaIterator {
  try {
    const response: any = yield call(getCategoriesAPI, action.level);
    yield put({
      type: GET_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: GET_CATEGORY_FAILURE,
      error: err.response.data.message,
    });
  }
}

function* watchGetCategoryById() {
  yield takeLatest(GET_CATEGORY_BY_ID_REQUEST, GetCategoryById);
}

function* watchGetCategoriesById() {
  yield takeLatest(GET_CATEGORIES_BY_ID_REQUEST, getCategoriesById);
}

function* watchGetCategories() {
  yield takeLatest(GET_CATEGORY_REQUEST, getCategories);
}

export default function* categorySaga() {
  yield all([fork(watchGetCategories), fork(watchGetCategoriesById), fork(watchGetCategoryById)]);
}
