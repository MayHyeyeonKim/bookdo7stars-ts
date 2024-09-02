'use client';
import { useEffect } from 'react';

import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { getAllBooksRequest, getBookRequest } from '../../actions/types';
import BookDetailContainer from '../../components/BookDetail/BookDetailContainer';
import { AppDispatch } from '../../store/store';
const BookDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookId } = useParams<{ bookId: string }>();
  console.log('디테일 페이지 대왕부모에서 bookId: ', bookId);

  useEffect(() => {
    dispatch(getAllBooksRequest());
  }, [dispatch]);

  useEffect(() => {
    if (bookId) {
      console.log('bookId는 문자열이다: ', bookId);
      dispatch(getBookRequest(bookId));
    }
  }, [bookId, dispatch]);

  return (
    <div>
      <BookDetailContainer />
    </div>
  );
};

export default BookDetailPage;
