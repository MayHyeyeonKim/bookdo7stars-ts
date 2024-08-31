'use client';
import { useEffect } from 'react';

import { Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import BooksContainer from '../components/Book/BooksContainer';
import { RootState } from '../reducers';
import { AppDispatch } from '../store/store';

const Books = () => {
  // load books from store
  const { books } = useSelector((store: RootState) => store.book);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 페이지가 렌더링될 때 마다 한 번 디스패치
    dispatch(getAllBooksRequest());
  }, []);

  return (
    <>
      <Typography variant="h3" component="div">
        All books
      </Typography>
      <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainer />
      </Container>
    </>
  );
};

export default Books;
