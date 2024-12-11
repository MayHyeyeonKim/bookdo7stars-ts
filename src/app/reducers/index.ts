import { combineReducers } from 'redux';

import { bookReducer, mainpageBookReducer } from './book';
import cartReducer from './cart';
import categoryReducer from './category';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  mainpageBook: mainpageBookReducer,
  category: categoryReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
