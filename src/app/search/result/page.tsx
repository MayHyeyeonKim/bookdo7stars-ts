'use client';
import { useState } from 'react';

import { Container, Box, Pagination, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import BooksContainer from '../../components/Book/BooksContainer';
import { RootState } from '../../reducers';

const ResultPage = () => {
  const [page, setPage] = useState(1);
  const { books, count } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {books.length > 0 ? (
          <>
            <BooksContainer books={books} title={'Search Result'} booksPerPage={booksPerPage} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
              <Pagination
                count={pageCount}
                page={page}
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
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h6">검색 결과가 없습니다.</Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ResultPage;
