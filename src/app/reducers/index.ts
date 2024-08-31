import { combineReducers } from 'redux';

import bookReducer from './book';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
