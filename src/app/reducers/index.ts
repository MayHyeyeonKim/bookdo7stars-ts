import { combineReducers } from 'redux';

import { bookReducer, mainpageBookReducer } from './book';
import cartReducer from './cart';
import categoryReducer from './category';
import reviewReducer from './review';
import userReducer from './user';
import wishlistReducer from './wishlist';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  mainpageBook: mainpageBookReducer,
  category: categoryReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  review: reviewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
