'use client';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import BooksContainer from '../components/Book/BooksContainer';
import { RootState } from '../reducers';
import { AppDispatch } from '../store/store';

const Books = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, count, currentPage } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  useEffect(() => {
    dispatch(getAllBooksRequest(currentPage, booksPerPage));
  }, []);

  return <BooksContainer books={books} title={'All Books'} booksPerPage={booksPerPage} pageCount={pageCount} />;
};

export default Books;
