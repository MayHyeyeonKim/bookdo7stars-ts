'use client';
import { useEffect, useState } from 'react';

import { Container, Box, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest } from '../actions/types';
import BooksContainer from '../components/Book/BooksContainer';
import { RootState } from '../reducers';
import { AppDispatch } from '../store/store';

const Books = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const { books, count } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  useEffect(() => {
    dispatch(getAllBooksRequest(page, booksPerPage));
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(getAllBooksRequest(value, booksPerPage));
  };

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainer books={books} title={'All Books'} booksPerPage={booksPerPage} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            sx={{
              justifyContent: 'center',
              '& .MuiPagination-ul': {
                flexWrap: 'nowrap',
              },
              '& .MuiPaginationItem-root': {
                minWidth: '32px',
                height: '32px',
              },
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Books;
