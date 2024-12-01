import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE } from '../actions/constants';
import { CategoryActionTypes } from '../actions/types';
import { Category } from '../models/category';

type InitialState = {
  categories: Category[];
  isGetCategoryLoading: boolean;
  isGetCategoryDone: boolean;
  isGetCategoryError: string;
};

export const initialState: InitialState = {
  categories: [],
  isGetCategoryLoading: false,
  isGetCategoryDone: false,
  isGetCategoryError: '',
};

function categoryReducer(state = initialState, action: CategoryActionTypes) {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { ...state, isGetCategoryLoading: true };
    case GET_CATEGORY_SUCCESS:
      return { ...state, isGetCategoryLoading: false, isGetCategoryDone: true, categories: action.payload };
    case GET_CATEGORY_FAILURE:
      return { ...state, isGetCategoryLoading: false, isGetCategoryDone: false, isGetCategoryError: action.error };
    default:
      return state;
  }
}

export default categoryReducer;
