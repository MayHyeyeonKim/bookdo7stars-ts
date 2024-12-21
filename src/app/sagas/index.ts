import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import bookSaga from './book';
import categorySaga from './category';
import userSaga from './user';
import cartSaga from './cart'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export function* rootSaga() {
  yield all([fork(userSaga), fork(bookSaga), fork(categorySaga), fork(cartSaga)]);
}

export default rootSaga;
