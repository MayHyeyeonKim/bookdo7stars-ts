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
} from '../actions';

// Register API
function registerAPI(data: RegisterRequestAction['data']) {
  return axios.post('/users', data);
}

// Register saga
function* register(action: RegisterRequestAction): SagaIterator {
  try {
    console.log('사가에서 회원가입 가공되기전의 action의 모습은? ', action); //{type: 'REGISTER_REQUEST', data: {…}}
    console.log('사가에서 회원가입 action.data의 모습은? ', action.data); //{name: 'maychu4', email: 'maychu4@gmail.com', password: '****', address: '', mobile: ''

    const response: any = yield call(registerAPI, action.data);
    console.log('사가에서 회원가입 백엔드에서 응답받은 가공되기전의 response는? ', response); // {data: {…}, status: 201,
    console.log('사가에서 회원가입 백엔드에서 응답받은 response의 data의 메세지는? ', response.data.message); //User registered successfully

    yield put({
      type: REGISTER_SUCCESS,
      register_message: response.data.message,
    });
  } catch (err: any) {
    console.log('사가에서 회원가입 에러 어떻게 들어오니? ', err.response?.data?.message);
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
      payload: response.data.user,
    });
  } catch (err: any) {
    const errMessage = err.response?.data?.message || 'Unknown error occurred';
    console.log('사가에서 Error 디스패치 잘 되었나:', errMessage);
    yield put({
      type: LOGIN_FAILURE,
      error: errMessage,
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
    console.log('로그아웃 사가 잘 탔니?');
    const response: any = yield call(logoutAPI); //{ message: 'User logged out successfully' }
    yield put({ type: LOGOUT_SUCCESS, payload: response.data.message }); //'User logged out successfully'
  } catch (err: any) {
    const errMessage = err.response?.data?.message || 'Unknown error occured'; //{ message: 'Error logging out' }
    console.log('logout error');
    yield put({
      type: LOGIN_FAILURE,
      error: errMessage, //'Error logging out'
    });
  }
}

// Watchers
function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register); // 첫번째 인자의 이 액션이 디스패치될 때 watchRegister가 감지하여 지정된 작업을 실행, 두번째인자는 작업함수
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
