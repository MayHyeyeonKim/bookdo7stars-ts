'use client';
import { useEffect, useState, useMemo } from 'react';

import { Container, Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { getBookIsbnSearchRequest, getBooksSearchRequest } from '../../actions/types';
import SearchResultBooksContainer from '../../components/Book/SearchResultBooksContainer';
import { RootState } from '../../reducers';
import { AppDispatch } from '../../store/store';
import { isbnType } from '../types/isbnType';
import { SearchType } from '../types/searchType';

const ResultPage = () => {
  const queryParams = useSearchParams();
  const isbn = queryParams.get('isbn');
  const searchCondition = queryParams.get('searchCondition');

  const [page, setPage] = useState(1);

  const parsedIsbn: isbnType = useMemo(() => {
    return isbn ? JSON.parse(decodeURIComponent(isbn)) : null;
  }, [isbn]);

  const parsedSearchCondition: SearchType = useMemo(() => {
    return searchCondition ? JSON.parse(decodeURIComponent(searchCondition)) : null;
  }, [searchCondition]);

  const dispatch = useDispatch<AppDispatch>();

  const { books, count, isGetBooksSearchLoading } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (parsedSearchCondition) {
      parsedSearchCondition.page = value;
      parsedSearchCondition.pageSize = booksPerPage;
      dispatch(getBooksSearchRequest(parsedSearchCondition));
    }
    if (parsedIsbn) {
      dispatch(getBookIsbnSearchRequest(parsedIsbn));
    }
  };

  useEffect(() => {
    if (parsedIsbn) {
      dispatch(getBookIsbnSearchRequest(parsedIsbn));
    }
    if (parsedSearchCondition) {
      parsedSearchCondition.pageSize = booksPerPage;
      dispatch(getBooksSearchRequest(parsedSearchCondition));
    }
  }, [dispatch, parsedIsbn, booksPerPage, parsedSearchCondition]);

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {books.length > 0 ? (
          <>
            <SearchResultBooksContainer
              books={books}
              count={count}
              title={'Search Result'}
              handlePageChange={handlePageChange}
              booksPerPage={booksPerPage}
              currentPage={page}
              searchTerm={parsedSearchCondition?.title || ''}
              resultCount={count}
              parsedSearchCondition={parsedSearchCondition}
              isGetBooksSearchLoading={isGetBooksSearchLoading}
            />
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
