import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RegisterRequestAction,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LoginRequestAction,
} from '../actions';

// Register API
function registerAPI(data: RegisterRequestAction['data']) {
  return axios.post('/users', data);
}

// Register saga
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

// Login API
function loginAPI(data: LoginRequestAction['data']) {
  return axios.post('/login', data);
}

// Login saga
function* login(action: LoginRequestAction): SagaIterator {
  try {
    const response: any = yield call(loginAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// Watchers
function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

// Root Saga
export default function* userSaga() {
  yield all([fork(watchRegister), fork(watchLogin)]);
}
