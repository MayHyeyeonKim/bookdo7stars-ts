import axios from 'axios';
import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, RegisterRequestAction } from '../actions';

function registerAPI(data: RegisterRequestAction['data']) {
  console.log('DATA', data);
  return axios.post('/users', data);
}

function* register(action: RegisterRequestAction) {
  try {
    yield call(registerAPI, action.data);
    yield put({
      type: REGISTER_SUCCESS,
    });
  } catch (err: any) {
    yield put({
      type: REGISTER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

export default function* userSaga() {
  yield all([fork(watchRegister)]);
}
