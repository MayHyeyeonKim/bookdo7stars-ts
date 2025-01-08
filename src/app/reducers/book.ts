import {
  GET_ALL_BOOKS_FAILURE,
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOKS_BY_GROUP_FAILURE,
  GET_BOOKS_BY_GROUP_REQUEST,
  GET_BOOKS_BY_GROUP_SUCCESS,
  GET_BOOKS_BY_CATEGORY_FAILURE,
  GET_BOOKS_BY_CATEGORY_REQUEST,
  GET_BOOKS_BY_CATEGORY_SUCCESS,
  GET_BOOKS_SEARCH_REQUEST,
  GET_BOOKS_SEARCH_SUCCESS,
  GET_BOOKS_SEARCH_FAILURE,
  GET_BOOK_ISBN_SEARCH_REQUEST,
  GET_BOOK_ISBN_SEARCH_SUCCESS,
  GET_BOOK_ISBN_SEARCH_FAILURE,
  GET_MAINPAGE_BOOKS_REQUEST,
  GET_MAINPAGE_BOOKS_SUCCESS,
  GET_MAINPAGE_BOOKS_FAILURE,
  GET_MAINPAGE_BESTSELLER_BOOKS_REQUEST,
  GET_MAINPAGE_BESTSELLER_BOOKS_SUCCESS,
  GET_MAINPAGE_BESTSELLER_BOOKS_FAILURE,
  RESET_GROUP_BOOKS,
  RESET_BOOK,
  SET_FILTERS,
  SET_PAGE,
  SET_SORTBY,
} from '../actions/constants';
import { BookActionTypes } from '../actions/types';
import { Book } from '../models/book';

type InitialState = {
  books: Book[];
  mainpageBooks: any;
  searchData: {};
  count: number;
  groupBooks: Book[];
  categoryBooks: Book[];
  isGetAllBooksLoading: boolean;
  isGetAllBooksDone: boolean;
  isGetAllBooksError: string;
  isGetBooksByGroupLoading: boolean;
  isGetBooksByGroupDone: boolean;
  isGetBooksByGroupError: string;
  isGetBooksByCategoryLoading: boolean;
  isGetBooksByCategoryDone: boolean;
  isGetBooksByCategoryError: string;
  isGetBooksSearchLoading: boolean;
  isGetBooksSearchDone: boolean;
  isGetBooksSearchError: string;
  isGetBookLoading: boolean;
  isGetBookDone: boolean;
  isGetBookError: string;
  isGetMainpageBooksLoading: boolean;
  isGetMainpageBooksDone: boolean;
  isGetMainpageBookError: string;
  isGetMainPageBestSellerBooksLoading: boolean;
  isGetMainPageBestSellerBooksDone: boolean;
  isGetMainPageBestSellerBooksError: string;
  book: Book | null;
  pageSize: number;
  filters: {
    dateRange: [undefined | number, undefined | number];
    priceRange: [number, number];
    rateRange: [number, number];
  };
  currentPage: number;
  sortBy: string;
};

export const initialState: InitialState = {
  books: [],
  mainpageBooks: { banner: [], itemNewSpecial: [], bestSellerCategory: [], itemNewAll: [], itemEditorChoice: [] },
  searchData: {
    title: '',
    author: '',
    publisher: '',
    orderTerm: 'sales',
    page: 1,
    pageSize: 20,
  },
  count: 0,
  groupBooks: [],
  categoryBooks: [],
  isGetAllBooksLoading: false,
  isGetAllBooksDone: false,
  isGetAllBooksError: '',
  isGetBooksByGroupLoading: false,
  isGetBooksByGroupDone: false,
  isGetBooksByGroupError: '',
  isGetBooksByCategoryLoading: false,
  isGetBooksByCategoryDone: false,
  isGetBooksByCategoryError: '',
  isGetBooksSearchLoading: false,
  isGetBooksSearchDone: false,
  isGetBooksSearchError: '',
  isGetBookLoading: false,
  isGetBookDone: false,
  isGetBookError: '',
  isGetMainpageBooksLoading: false,
  isGetMainpageBooksDone: false,
  isGetMainpageBookError: '',
  isGetMainPageBestSellerBooksLoading: false,
  isGetMainPageBestSellerBooksDone: false,
  isGetMainPageBestSellerBooksError: '',
  book: null,
  pageSize: 20,
  filters: {
    dateRange: [undefined, undefined], // Represents the values in months (3M to 60M or 전체)
    priceRange: [0, 100000],
    rateRange: [0, 10],
  },
  currentPage: 1,
  sortBy: 'accuracy',
};

function bookReducer(state = initialState, action: BookActionTypes) {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return { ...state, isGetAllBooksLoading: true };
    case GET_ALL_BOOKS_SUCCESS:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: true, books: action.payload, count: action.count };
    case GET_ALL_BOOKS_FAILURE:
      return { ...state, isGetAllBooksLoading: false, isGetAllBooksDone: false, isGetAllBooksError: action.error };

    case GET_BOOKS_BY_GROUP_REQUEST:
      return { ...state, isGetBooksByGroupLoading: true };
    case GET_BOOKS_BY_GROUP_SUCCESS:
      return { ...state, isGetBooksByGroupLoading: false, isGetBooksByGroupDone: true, groupBooks: state.groupBooks.concat(action.payload) };
    case GET_BOOKS_BY_GROUP_FAILURE:
      return { ...state, isGetBooksByGroupLoading: false, isGetBooksByGroupDone: false, isGetBooksByGroupError: action.error };

    case GET_BOOKS_BY_CATEGORY_REQUEST:
      return { ...state, isGetBooksByCategoryLoading: true };
    case GET_BOOKS_BY_CATEGORY_SUCCESS:
      return { ...state, isGetBooksByCategoryLoading: false, isGetBooksByCategoryDone: true, categoryBooks: action.payload, count: action.count };
    case GET_BOOKS_BY_CATEGORY_FAILURE:
      return { ...state, isGetBooksByCategoryLoading: false, isGetBooksByCategoryDone: false, isGetBooksByGroupError: action.error };

    case GET_BOOKS_SEARCH_REQUEST:
      return { ...state, isGetBooksSearchLoading: true, searchData: action.data };
    case GET_BOOKS_SEARCH_SUCCESS:
      return { ...state, isGetBooksSearchLoading: false, isGetBooksSearchDone: true, books: action.payload, count: action.count };
    case GET_BOOKS_SEARCH_FAILURE:
      return { ...state, isGetBooksSearchLoading: false, isGetBooksSearchDone: false, isGetBooksSearchError: action.error };

    case GET_BOOK_ISBN_SEARCH_REQUEST:
      return { ...state, isGetBooksSearchLoading: true };
    case GET_BOOK_ISBN_SEARCH_SUCCESS:
      return { ...state, isGetBooksSearchLoading: false, isGetBooksSearchDone: true, books: [action.payload], count: 1 };
    case GET_BOOK_ISBN_SEARCH_FAILURE:
      return { ...state, isGetBooksSearchLoading: false, isGetBooksSearchDone: false, isGetBooksSearchError: action.error, books: [] };

    case GET_BOOK_REQUEST:
      return { ...state, isGetBookLoading: true };
    case GET_BOOK_SUCCESS:
      return { ...state, isGetBookLoading: false, isGetBookDone: true, book: action.payload };
    case GET_BOOK_FAILURE:
      return { ...state, isGetBookLoading: false, book: null, isGetBookError: action.error };
    case GET_MAINPAGE_BESTSELLER_BOOKS_REQUEST:
      return { ...state, isGetMainPageBestSellerBooksLoading: true };
    case GET_MAINPAGE_BESTSELLER_BOOKS_SUCCESS:
      return { ...state, isGetMainPageBestSellerBooksLoading: false, isGetMainPageBestSellerBooksDone: true, books: action.payload };
    case GET_MAINPAGE_BESTSELLER_BOOKS_FAILURE:
      return { ...state, isGetMainPageBestSellerBooksLoading: false, book: null, isGetMainPageBestSellerBooksError: action.error };

    case RESET_BOOK:
      return { ...state, book: null };
    case RESET_GROUP_BOOKS:
      return { ...state, groupBooks: [] };

    case SET_FILTERS:
      return { ...state, filters: action.data };
    case SET_PAGE:
      return { ...state, currentPage: action.data };
    case SET_SORTBY:
      return { ...state, sortBy: action.data };
    default:
      return state;
  }
}

function mainpageBookReducer(state = initialState, action: BookActionTypes) {
  switch (action.type) {
    case GET_MAINPAGE_BOOKS_REQUEST:
      return { ...state, isGetMainpageBooksLoading: true };
    case GET_MAINPAGE_BOOKS_SUCCESS:
      return { ...state, isGetMainpageBooksLoading: false, isGetMainpageBooksDone: true, mainpageBooks: action.payload };
    case GET_MAINPAGE_BOOKS_FAILURE:
      return { ...state, isGetBookLoading: false, book: null, isGetMainpageBooksError: action.error };
    default:
      return state;
  }
}

export { bookReducer, mainpageBookReducer };
