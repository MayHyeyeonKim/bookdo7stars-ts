import {
  RESET_BOOKS,
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOKS_GROUPNAME_FAILURE,
  GET_BOOKS_GROUPNAME_REQUEST,
  GET_BOOKS_GROUPNAME_SUCCESS,
} from '../actions/constants';
import { BookActionTypes } from '../actions/types';
import { Book } from '../models/book';

type InitialState = {
  books: Book[];
  isGetAllBooksLoading: boolean;
  isGetAllBooksDone: boolean;
  isGetAllBooksError: string;
  isGetBookLoading: boolean;
  isGetBookDone: boolean;
  isGetBookError: string;
  isGetBooksGroupNameLoading: boolean;
  isGetBooksGroupNameDone: boolean;
  isGetBooksGroupNameError: string;
  book: Book[];
};

export const initialState: InitialState = {
  books: [],
  isGetAllBooksLoading: false,
  isGetAllBooksDone: false,
  isGetAllBooksError: '',
  isGetBookLoading: false,
  isGetBookDone: false,
  isGetBookError: '',
  isGetBooksGroupNameLoading: false,
  isGetBooksGroupNameDone: false,
  isGetBooksGroupNameError: '',
  book: [],
};

function bookReducer(state = initialState, action: BookActionTypes) {
  switch (action.type) {
    case RESET_BOOKS:
      return { ...state, isGetBooksGroupNameLoading: false, isGetBooksGroupNameDone: true, books: [] };
    case GET_ALL_BOOKS_REQUEST:
      return { ...state, isGetAllBooksLoading: true };
    case GET_ALL_BOOKS_SUCCESS:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: true, books: action.payload };
    case GET_ALL_BOOKS_FAILURE:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: false, isGetAllBooksError: action.error };

    case GET_BOOK_REQUEST:
      return { ...state, isGetBookLoaing: true };
    case GET_BOOK_SUCCESS:
      return { ...state, isGetBookLoading: false, book: action.payload };
    case GET_BOOK_FAILURE:
      return { ...state, isGetBookLoading: false, book: [], isGetBookError: action.error };

    case GET_BOOKS_GROUPNAME_REQUEST:
      return { ...state, isGetBooksGroupNameLoading: true };
    case GET_BOOKS_GROUPNAME_SUCCESS:
      return { ...state, isGetBooksGroupNameLoading: false, isGetBooksGroupNameDone: true, books: [...state.books, ...action.payload] };
    case GET_BOOKS_GROUPNAME_FAILURE:
      return { ...state, isGetBooksGroupNameLoading: false, isGetBooksGroupNameDone: false, isGetBooksGroupNameError: action.error };
    default:
      return state;
  }
}

export default bookReducer;
