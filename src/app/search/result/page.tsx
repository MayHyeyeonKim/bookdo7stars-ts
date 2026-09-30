'use client';

import { Suspense, useEffect, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { getBookIsbnSearchRequest, getBooksSearchRequest } from '../../actions/types';
import SearchResultBooksContainer from '../../components/Book/SearchResultBooksContainer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { RootState } from '../../reducers';
import { AppDispatch } from '../../store/store';
import { IsbnType } from '../types/isbnType';
import { SearchType } from '../types/searchType';

const ResultPageContent = () => {
  const queryParams = useSearchParams();
  const isbn = queryParams.get('isbn');
  const searchCondition = queryParams.get('searchCondition');
  const { currentPage, sortBy } = useSelector((store: RootState) => store.book);

  const parsedIsbn: IsbnType = useMemo(() => {
    return isbn ? JSON.parse(decodeURIComponent(isbn)) : null;
  }, [isbn]);

  const parsedSearchCondition: SearchType = useMemo(() => {
    return searchCondition ? JSON.parse(decodeURIComponent(searchCondition)) : null;
  }, [searchCondition]);

  const dispatch = useDispatch<AppDispatch>();

  const { books, count, isGetBooksSearchLoading } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;

  useEffect(() => {
    if (parsedIsbn) {
      dispatch(getBookIsbnSearchRequest(parsedIsbn));
    }
    if (parsedSearchCondition) {
      const updatedCondition = { ...parsedSearchCondition, page: currentPage, pageSize: booksPerPage, orderTerm: sortBy };

      dispatch(getBooksSearchRequest(updatedCondition));
    }
  }, [parsedIsbn, dispatch, currentPage, sortBy]);

  return (
    <>
      {isGetBooksSearchLoading ? (
        <LoadingSpinner />
      ) : (
        <SearchResultBooksContainer
          books={books}
          count={count}
          booksPerPage={booksPerPage}
          searchTerm={parsedSearchCondition?.title || ''}
          resultCount={count}
          parsedSearchCondition={parsedSearchCondition}
          parsedIsbn={parsedIsbn}
        />
      )}
    </>
  );
};

const ResultPage = () => (
  <Suspense fallback={<LoadingSpinner />}> // Suspense wrapper is used to show a loading spinner while the component is being loaded
    <ResultPageContent />
  </Suspense>
);

export default ResultPage;
