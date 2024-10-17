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
  }, [bookId]);

  const validBook = typeof book === 'string' || Array.isArray(book) ? null : book;
  return (
    <div>
      <BookOverview book={validBook} />
      <BookDetails book={validBook} />
    </div>
  );
};

export default BookDetailPage;
