import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import bookSaga from './book';
import cartSaga from './cart';
import categorySaga from './category';
import reviewSaga from './review';
import userSaga from './user';
import wishlistSaga from './wishlist';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export function* rootSaga() {
  yield all([fork(userSaga), fork(bookSaga), fork(categorySaga), fork(cartSaga), fork(wishlistSaga), fork(reviewSaga)]);
}

export default rootSaga;
