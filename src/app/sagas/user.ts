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
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from '../actions/constants';

// Register API
function registerAPI(data: RegisterRequestAction['data']) {
  return axios.post('/users', data);
}

// Register saga
function* register(action: RegisterRequestAction): SagaIterator {
  try {
    const response: any = yield call(registerAPI, action.data);
    yield put({
      type: REGISTER_SUCCESS,
      payload: response.data.message,
    });
  } catch (err: any) {
    yield put({
      type: REGISTER_FAILURE,
      error: err.response.data.message,
    });
  }
}

// Login API
function loginAPI(data: LoginRequestAction['data']) {
  return axios.post('/login', data);
}

// Login saga
export function* login(action: LoginRequestAction): SagaIterator {
  try {
    const response: any = yield call(loginAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data.message,
    });
  }
}

// Logout API
function logoutAPI() {
  return axios.post('/logout');
}

//Logout saga
function* logout(): SagaIterator {
  try {
    const response: any = yield call(logoutAPI); //{ message: 'User logged out successfully' }
    yield put({ type: LOGOUT_SUCCESS, payload: response.data.message }); //'User logged out successfully'
  } catch (err: any) {
    const errMessage = err.response.data.message || 'Unknown error occured'; //{ message: 'Error logging out' }
    yield put({
      type: LOGIN_FAILURE,
      error: errMessage, //'Error logging out'
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

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

// Root Saga
export default function* userSaga() {
  yield all([fork(watchRegister), fork(watchLogin), fork(watchLogout)]);
}
