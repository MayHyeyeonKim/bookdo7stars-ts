import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE } from '../actions/constants';
import { GetCategoryRequestAction } from '../actions/types';

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

function* watchGetCategories() {
  yield takeLatest(GET_CATEGORY_REQUEST, getCategories);
}

export default function* categorySaga() {
  yield all([fork(watchGetCategories)]);
}
