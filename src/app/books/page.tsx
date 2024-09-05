'use client';
import { useEffect } from 'react';

import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import BooksContainer from '../components/Book/BooksContainer';
import { RootState } from '../reducers';
import { AppDispatch } from '../store/store';

const Books = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((store: RootState) => store.book);

  useEffect(() => {
    dispatch(getAllBooksRequest());
  }, []);

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainer books={books} title={'All Books'} />
      </Container>
    </>
  );
};

export default Books;
