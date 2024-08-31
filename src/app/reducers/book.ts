import { GET_ALL_BOOKS_FAILURE, GET_ALL_BOOKS_REQUEST, GET_ALL_BOOKS_SUCCESS } from '../actions/constants';
import { BookActionTypes } from '../actions/types';
import { Book } from '../models/book';

type InitialState = {
  books: Book[];
  isGetAllBooksLoading: boolean;
  isGetAllBooksDone: boolean;
  isGetAllBooksError: string;
};

export const initialState: InitialState = {
  books: [],
  isGetAllBooksLoading: false,
  isGetAllBooksDone: false,
  isGetAllBooksError: '',
};

function bookReducer(state = initialState, action: BookActionTypes) {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return { ...state, isGetAllBooksLoading: true };
    case GET_ALL_BOOKS_SUCCESS:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: true, books: action.payload };
    case GET_ALL_BOOKS_FAILURE:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: false, isGetAllBooksError: action.error };

    default:
      return state;
  }
}

export default bookReducer;
