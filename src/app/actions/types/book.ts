import { Book } from '@/app/models/book';

import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOKS_BY_GROUP_FAILURE,
  GET_BOOKS_BY_GROUP_REQUEST,
  GET_BOOKS_BY_GROUP_SUCCESS,
  GET_BOOKS_SEARCH_REQUEST,
  GET_BOOKS_SEARCH_SUCCESS,
  GET_BOOKS_SEARCH_FAILURE,
  GET_BOOK_ISBN_SEARCH_REQUEST,
  GET_BOOK_ISBN_SEARCH_SUCCESS,
  GET_BOOK_ISBN_SEARCH_FAILURE,
  GET_BOOKS_AUTHOR_SEARCH_REQUEST,
  GET_BOOKS_AUTHOR_SEARCH_SUCCESS,
  GET_BOOKS_AUTHOR_SEARCH_FAILURE,
  GET_MAINPAGE_BOOKS_REQUEST,
  GET_MAINPAGE_BOOKS_SUCCESS,
  GET_MAINPAGE_BOOKS_FAILURE,
  GET_MAINPAGE_BESTSELLER_BOOKS_REQUEST,
  GET_MAINPAGE_BESTSELLER_BOOKS_SUCCESS,
  GET_MAINPAGE_BESTSELLER_BOOKS_FAILURE,
  RESET_MAINPAGE_BOOKS,
  RESET_GROUP_BOOKS,
  RESET_AUTHOR_BOOKS,
  GET_BOOKS_BY_CATEGORY_FAILURE,
  GET_BOOKS_BY_CATEGORY_REQUEST,
  GET_BOOKS_BY_CATEGORY_SUCCESS,
  RESET_BOOK,
  SET_FILTERS,
  SET_PAGE,
  SET_SORTBY,
  SET_SELECTED_BOOKS,
} from '../constants';

// Action type
// We’ve decided to define request data as data:{}, response data as payload, and errors simply as error.

// All Books
export interface GetAllBooksRequestAction {
  type: typeof GET_ALL_BOOKS_REQUEST;
  page: number;
  pageSize: number;
}

export interface GetAllBooksSuccessAction {
  type: typeof GET_ALL_BOOKS_SUCCESS;
  payload: Book[];
  count: number;
}

export interface GetAllBooksFailureAction {
  type: typeof GET_ALL_BOOKS_FAILURE;
  error: string;
}

export interface GetBooksByGroupRequestAction {
  type: typeof GET_BOOKS_BY_GROUP_REQUEST;
  data: { groupName: string; page?: number; pageSize?: number };
}

export interface GetBooksByGroupSuccessAction {
  type: typeof GET_BOOKS_BY_GROUP_SUCCESS;
  payload: Book[];
}

export interface GetBooksByGroupFailureAction {
  type: typeof GET_BOOKS_BY_GROUP_FAILURE;
  error: string;
}
//Book Search
export interface GetBooksSearchRequestAction {
  type: typeof GET_BOOKS_SEARCH_REQUEST;
  data: {
    searchTerm?: string;
    title?: string;
    author?: string;
    publisher?: string;
    orderTerm?: string;
    start_date?: string | null;
    end_date?: string | null;
    page?: number;
    pageSize?: number;
    start_price?: number;
    end_price?: number;
    start_rate?: number;
    end_rate?: number;
  };
}

export interface GetBooksSearchSuccessAction {
  type: typeof GET_BOOKS_SEARCH_SUCCESS;
  payload: Book[];
  count: number;
}

export interface GetBooksSearchFailureAction {
  type: typeof GET_BOOKS_SEARCH_FAILURE;
  error: string;
}

// Books by Category
export interface GetBooksByCategoryRequestAction {
  type: typeof GET_BOOKS_BY_CATEGORY_REQUEST;
  data: {
    categoryId: string;
    page?: number;
    pageSize?: number;
    orderTerm: string;
    categoryName: string;
  };
}

export interface GetBooksByCategorySuccessAction {
  type: typeof GET_BOOKS_BY_CATEGORY_SUCCESS;
  payload: Book[];
  count: number;
}

export interface GetBooksByCategoryFailureAction {
  type: typeof GET_BOOKS_BY_CATEGORY_FAILURE;
  error: string;
}

//Book ISBN Search
export interface GetBookIsbnSearchRequestAction {
  type: typeof GET_BOOK_ISBN_SEARCH_REQUEST;
  isbn: string | undefined;
}

export interface GetBookIsbnSearchSuccessAction {
  type: typeof GET_BOOK_ISBN_SEARCH_SUCCESS;
  payload: Book;
}

export interface GetBookIsbnSearchFailureAction {
  type: typeof GET_BOOK_ISBN_SEARCH_FAILURE;
  error: string;
}

//Book Author Search
export interface GetBooksAuthorSearchRequestAction {
  type: typeof GET_BOOKS_AUTHOR_SEARCH_REQUEST;
  author: string | undefined;
  bookId: number;
  page?: number;
  pageSize?: number;
}

export interface GetBooksAuthorSearchSuccessAction {
  type: typeof GET_BOOKS_AUTHOR_SEARCH_SUCCESS;
  payload: Book[];
}

export interface GetBooksAuthorSearchFailureAction {
  type: typeof GET_BOOKS_AUTHOR_SEARCH_FAILURE;
  error: string;
}

// Book Detail
export interface GetBookRequestAction {
  type: typeof GET_BOOK_REQUEST;
  data: string;
}

export interface GetBookSuccessAction {
  type: typeof GET_BOOK_SUCCESS;
  payload: Book;
}

// Mainpage Books
export interface GetMainpageBooksRequestAction {
  type: typeof GET_MAINPAGE_BOOKS_REQUEST;
}

export interface GetMainpageBooksSuccessAction {
  type: typeof GET_MAINPAGE_BOOKS_SUCCESS;
  payload: any;
}

export interface GetMainpageBooksFailureAction {
  type: typeof GET_MAINPAGE_BOOKS_FAILURE;
  error: string;
}

// Mainpage Bestseller Books
export interface GetMainpageBestSellerBooksRequestAction {
  type: typeof GET_MAINPAGE_BESTSELLER_BOOKS_REQUEST;
  categoryId: number;
  page: number;
  pageSize: number;
}

export interface GetMainpageBestSellerBooksSuccessAction {
  type: typeof GET_MAINPAGE_BESTSELLER_BOOKS_SUCCESS;
  payload: any;
}

export interface GetMainpageBestSellerBooksFailureAction {
  type: typeof GET_MAINPAGE_BESTSELLER_BOOKS_FAILURE;
  error: string;
}

export interface ResetMainpageBooksAction {
  type: typeof RESET_MAINPAGE_BOOKS;
}

export interface GetBookFailureAction {
  type: typeof GET_BOOK_FAILURE;
  error: string;
}

export interface ResetGroupBooksAction {
  type: typeof RESET_GROUP_BOOKS;
}

export interface ResetAuthorBooksAction {
  type: typeof RESET_AUTHOR_BOOKS;
}

export interface ResetBookAction {
  type: typeof RESET_BOOK;
}

export interface SetFiltersAction {
  type: typeof SET_FILTERS;
  data: {
    dateRange: [number | undefined, number | undefined];
    priceRange: [number, number];
    rateRange: [number, number];
  };
}
export interface SetPageAction {
  type: typeof SET_PAGE;
  data: number;
}

export interface SetSortByAction {
  type: typeof SET_SORTBY;
  data: string;
}

export interface SetSelectedBooksAction {
  type: typeof SET_SELECTED_BOOKS;
  data: Book[];
}

//Union type
export type BookActionTypes =
  | GetAllBooksRequestAction
  | GetAllBooksSuccessAction
  | GetAllBooksFailureAction
  | GetBooksByGroupRequestAction
  | GetBooksByGroupSuccessAction
  | GetBooksByGroupFailureAction
  | GetBooksSearchRequestAction
  | GetBooksSearchSuccessAction
  | GetBooksSearchFailureAction
  | GetBookRequestAction
  | GetBookSuccessAction
  | GetBookFailureAction
  | ResetGroupBooksAction
  | GetBookIsbnSearchRequestAction
  | GetBookIsbnSearchSuccessAction
  | GetBookIsbnSearchFailureAction
  | GetBooksAuthorSearchRequestAction
  | GetBooksAuthorSearchSuccessAction
  | GetBooksAuthorSearchFailureAction
  | GetMainpageBooksRequestAction
  | GetMainpageBooksSuccessAction
  | GetMainpageBooksFailureAction
  | GetMainpageBestSellerBooksRequestAction
  | GetMainpageBestSellerBooksSuccessAction
  | GetMainpageBestSellerBooksFailureAction
  | ResetMainpageBooksAction
  | ResetBookAction
  | ResetAuthorBooksAction
  | SetFiltersAction
  | GetBooksByCategoryRequestAction
  | GetBooksByCategorySuccessAction
  | GetBooksByCategoryFailureAction
  | SetPageAction
  | SetSortByAction
  | SetSelectedBooksAction;

// Action creater

//All Books
export const getAllBooksRequest = (page: number, pageSize: number): GetAllBooksRequestAction => ({
  type: GET_ALL_BOOKS_REQUEST,
  page,
  pageSize,
});

export const getAllBooksSuccess = (payload: GetAllBooksSuccessAction['payload'], count: GetAllBooksSuccessAction['count']): GetAllBooksSuccessAction => ({
  type: GET_ALL_BOOKS_SUCCESS,
  payload,
  count,
});

export const getAllBooksFailure = (error: string): GetAllBooksFailureAction => ({
  type: GET_ALL_BOOKS_FAILURE,
  error,
});

//Books By Group
export const getBooksByGroupRequest = (data: GetBooksByGroupRequestAction['data']): GetBooksByGroupRequestAction => ({
  type: GET_BOOKS_BY_GROUP_REQUEST,
  data,
});

export const getBooksByGroupSuccess = (payload: GetBooksByGroupSuccessAction['payload']): GetBooksByGroupSuccessAction => ({
  type: GET_BOOKS_BY_GROUP_SUCCESS,
  payload,
});

export const getBooksByGroupFailure = (error: string): GetBooksByGroupFailureAction => ({
  type: GET_BOOKS_BY_GROUP_FAILURE,
  error,
});

//Books Search
export const getBooksSearchRequest = (data: GetBooksSearchRequestAction['data']): GetBooksSearchRequestAction => ({
  type: GET_BOOKS_SEARCH_REQUEST,
  data,
});

export const getBooksSearchSuccess = (
  payload: GetBooksSearchSuccessAction['payload'],
  count: GetAllBooksSuccessAction['count'],
): GetBooksSearchSuccessAction => ({
  type: GET_BOOKS_SEARCH_SUCCESS,
  payload,
  count,
});

export const getBooksSearchFailure = (error: string): GetBooksSearchFailureAction => ({
  type: GET_BOOKS_SEARCH_FAILURE,
  error,
});

//Books by Category
export const getBooksByCategoryRequest = (data: GetBooksByCategoryRequestAction['data']): GetBooksByCategoryRequestAction => ({
  type: GET_BOOKS_BY_CATEGORY_REQUEST,
  data,
});

export const getBooksByCategorySuccess = (
  payload: GetBooksByCategorySuccessAction['payload'],
  count: GetBooksByCategorySuccessAction['count'],
): GetBooksByCategorySuccessAction => ({
  type: GET_BOOKS_BY_CATEGORY_SUCCESS,
  payload,
  count,
});

export const getBooksByCategoryFailure = (error: string): GetBooksByCategoryFailureAction => ({
  type: GET_BOOKS_BY_CATEGORY_FAILURE,
  error,
});

//Book ISBN Search
export const getBookIsbnSearchRequest = (isbn: GetBookIsbnSearchRequestAction['isbn']): GetBookIsbnSearchRequestAction => ({
  type: GET_BOOK_ISBN_SEARCH_REQUEST,
  isbn,
});

export const getBookIsbnSearchSuccess = (payload: GetBookIsbnSearchSuccessAction['payload']): GetBookIsbnSearchSuccessAction => ({
  type: GET_BOOK_ISBN_SEARCH_SUCCESS,
  payload,
});

export const getBookIsbnSearchFailure = (error: string): GetBookIsbnSearchFailureAction => ({
  type: GET_BOOK_ISBN_SEARCH_FAILURE,
  error,
});

//Book Author Search
export const getBooksAuthorSearchRequest = (
  author: GetBooksAuthorSearchRequestAction['author'],
  bookId: GetBooksAuthorSearchRequestAction['bookId'],
  page: GetBooksAuthorSearchRequestAction['page'],
  pageSize: GetBooksAuthorSearchRequestAction['pageSize'],
): GetBooksAuthorSearchRequestAction => ({
  type: GET_BOOKS_AUTHOR_SEARCH_REQUEST,
  author,
  bookId,
  page,
  pageSize,
});

export const getBooksAuthorSearchSuccess = (payload: GetBooksAuthorSearchSuccessAction['payload']): GetBooksAuthorSearchSuccessAction => ({
  type: GET_BOOKS_AUTHOR_SEARCH_SUCCESS,
  payload,
});

export const getBooksAuthorSearchFailure = (error: string): GetBooksAuthorSearchFailureAction => ({
  type: GET_BOOKS_AUTHOR_SEARCH_FAILURE,
  error,
});

//Book Detail
export const getBookRequest = (data: GetBookRequestAction['data']): GetBookRequestAction => ({
  type: GET_BOOK_REQUEST,
  data,
});

export const getBookSuccess = (payload: GetBookSuccessAction['payload']): GetBookSuccessAction => ({
  type: GET_BOOK_SUCCESS,
  payload,
});

export const getBookFailure = (error: string): GetBookFailureAction => ({
  type: GET_BOOK_FAILURE,
  error,
});

//Book Mainpage
export const getMainpageBooksRequest = (): GetMainpageBooksRequestAction => ({
  type: GET_MAINPAGE_BOOKS_REQUEST,
});

export const getMainpageBooksSuccess = (payload: GetMainpageBooksSuccessAction['payload']): GetMainpageBooksSuccessAction => ({
  type: GET_MAINPAGE_BOOKS_SUCCESS,
  payload,
});

export const getMainpageBooksFailure = (error: string): GetMainpageBooksFailureAction => ({
  type: GET_MAINPAGE_BOOKS_FAILURE,
  error,
});

//Book Mainpage BestSeller
export const getMainpageBestSellerBooksRequest = (categoryId: number, page: number, pageSize: number): GetMainpageBestSellerBooksRequestAction => ({
  type: GET_MAINPAGE_BESTSELLER_BOOKS_REQUEST,
  categoryId,
  page,
  pageSize,
});

export const getMainpageBestSellerBooksSuccess = (payload: GetMainpageBestSellerBooksSuccessAction['payload']): GetMainpageBestSellerBooksSuccessAction => ({
  type: GET_MAINPAGE_BESTSELLER_BOOKS_SUCCESS,
  payload,
});

export const getMainpageBestSellerBooksFailure = (error: string): GetMainpageBestSellerBooksFailureAction => ({
  type: GET_MAINPAGE_BESTSELLER_BOOKS_FAILURE,
  error,
});

export const resetMainpageBooks = (): ResetMainpageBooksAction => ({
  type: RESET_MAINPAGE_BOOKS,
});

export const resetGroupBooks = (): ResetGroupBooksAction => ({
  type: RESET_GROUP_BOOKS,
});

export const resetAuthorBooks = (): ResetAuthorBooksAction => ({
  type: RESET_AUTHOR_BOOKS,
});

export const resetBook = (): ResetBookAction => ({
  type: RESET_BOOK,
});

export const setFilters = (data: SetFiltersAction['data']): SetFiltersAction => ({
  type: SET_FILTERS,
  data,
});

export const setPage = (data: SetPageAction['data']): SetPageAction => ({
  type: SET_PAGE,
  data: data,
});

export const setSortBy = (data: SetSortByAction['data']): SetSortByAction => ({
  type: SET_SORTBY,
  data: data,
});

export const setSelectedBooks = (data: SetSelectedBooksAction['data']): SetSelectedBooksAction => ({
  type: SET_SELECTED_BOOKS,
  data: data,
});
