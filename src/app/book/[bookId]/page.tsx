'use client';
import { useEffect } from 'react';

import { RootState } from '@/app/reducers';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { getBookRequest } from '../../actions/types';
import BookDetails from '../../components/BookDetail/BookDetails';
import BookOverview from '../../components/BookDetail/BookOverview';
import { AppDispatch } from '../../store/store';

const BookDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { book } = useSelector((store: RootState) => store.book);
  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
    if (bookId) {
      dispatch(getBookRequest(bookId));
    }
  }, [dispatch, bookId]);

  // 책 데이터가 없거나 잘못된 경우 처리
  if (!book) {
    return <p>책 정보를 읽어오는 중입니다...</p>;
  }

  // 책 데이터가 있을 때만 컴포넌트 렌더링
  return (
    <div>
      <BookOverview book={book} />
      <BookDetails book={book} />
    </div>
  );
};

export default BookDetailPage;
