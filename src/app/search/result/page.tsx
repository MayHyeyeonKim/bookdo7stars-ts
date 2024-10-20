'use client';
import { useEffect, useState } from 'react';

import { Container, Box, Pagination } from '@mui/material';
import { useRouter } from 'next/navigation'; // Next.js의 라우터 사용
import { useDispatch, useSelector } from 'react-redux';

import { getBooksSearchRequest } from '../../actions/types';
import BooksContainer from '../../components/Book/BooksContainer';
import { RootState } from '../../reducers';
import { AppDispatch } from '../../store/store';

const ResultPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // useRouter를 이용하여 쿼리 값 접근
  const [page, setPage] = useState(1);
  const { books, count } = useSelector((store: RootState) => store.book);
  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  // router.query를 통해 쿼리 파라미터에서 검색 값을 가져옴
  useEffect(() => {
    if (!router.isReady) return; // router가 준비되지 않았으면 리턴
    const query = router.query;
    const title = query.title || ''; // 쿼리에서 가져온 title

    // 검색 요청 API 호출
    dispatch(getBooksSearchRequest({ page: page, pageSize: booksPerPage, title }));
  }, [page, router.isReady]); // page와 router.isReady가 변경될 때마다 API 호출

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // 페이지 값을 업데이트
  };

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainer books={books} title={'Search Results'} booksPerPage={booksPerPage} />
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

export default ResultPage;
