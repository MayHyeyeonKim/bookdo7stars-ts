import { combineReducers } from 'redux';

import bookReducer from './book';
import categoryReducer from './category';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
