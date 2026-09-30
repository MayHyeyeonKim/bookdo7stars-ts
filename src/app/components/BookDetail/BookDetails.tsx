'use client';
import { useEffect, useRef, useState } from 'react';

import { addReviewRequest, deleteReviewRequest, editReviewRequest, getAllReviewsOfBookRequest } from '@/app/actions/types';
import { User } from '@/app/models/user';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Container, Tabs, Tab, Typography, Paper } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import BookDetailBookInfo from './BookDetailComponents/BookDetailBookInfo';
import BookDetailOtherByAuthor from './BookDetailComponents/BookDetailOtherByAuthor';
import BookDetailShippingPolicy from './BookDetailComponents/BookDetailShippingPolicy';
import Review from './BookDetailComponents/Review/Review';
import ReviewCard from './BookDetailComponents/Review/ReviewCard';
import { Book } from '../../models/book';

interface BookDetailsProps {
  book: Book;
  user: User | null;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, user }) => {
  const [activeTab, setActiveTab] = useState<string>('bookIntro');
  const [review, setReview] = useState<string>('');
  const [editedReview, setEditedReview] = useState<string>('');
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const lastScrollY = useRef<number>(0);

  const { reviews, isAddReviewError, isAddReviewDone, isEditReviewError, isEditReviewDone, isDeleteReviewError } = useSelector(
    (store: RootState) => store.review,
  );

  const sections = [
    { id: 'bookIntro', label: 'Book Introduction' },
    { id: 'bookInfo', label: 'Book Information' },
    { id: 'author', label: 'Other Books by the Author' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'delivery', label: 'Delivery' },
  ];

  useEffect(() => {
    dispatch(getAllReviewsOfBookRequest({ bookId: book.id }));
  }, [book.id, isAddReviewDone, isEditReviewDone]);

  useEffect(() => {
    if (isAddReviewError) toast.error(isAddReviewError);
    if (isEditReviewError) toast.error(isEditReviewError);
    if (isDeleteReviewError) toast.error(isDeleteReviewError);
    if (isAddReviewDone) toast.success('Your review is posted Successfully!');
    if (isEditReviewDone) toast.success('Your review is edited Successfully!');
  }, [isAddReviewError, isEditReviewError, isDeleteReviewError, isAddReviewDone, isEditReviewDone]);

  useEffect(() => {
    const handleScroll = () => {
      let closestSection = null;
      let minDistance = Infinity;

      Object.entries(sectionRefs.current).forEach(([id, section]) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = id;
          }
        }
      });
      if (closestSection) {
        setActiveTab(closestSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOnChangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };
  const handleOnChangeEditReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedReview(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    setTimeout(() => {
      const sectionElement = sectionRefs.current[newValue];
      if (sectionElement) {
        window.scrollTo({ top: sectionElement.offsetTop - 50, behavior: 'smooth' });
      }
    }, 20);
  };

  const postReview = (reviewId?: string) => {
    if (!isEditing[reviewId!]) {
      dispatch(addReviewRequest({ bookId: book.id, content: review }));
      dispatch(getAllReviewsOfBookRequest({ bookId: book.id }));
    } else {
      dispatch(editReviewRequest({ bookId: book.id, reviewId: reviewId, content: editedReview }));
      dispatch(getAllReviewsOfBookRequest({ bookId: book.id }));
    }
    setReview('');
    setEditedReview('');
    setIsEditing((prevState) => ({
      ...prevState,
      [reviewId!]: false,
    }));
  };
  const editReview = (reviewId: string) => {
    const selectedReview = reviews.find((review) => review.id === reviewId);
    setEditedReview(selectedReview ? selectedReview.content : '');
    setIsEditing((prevState) => ({
      ...prevState,
      [reviewId]: true,
    }));
  };

  const deleteReview = (reviewId: string) => {
    dispatch(deleteReviewRequest({ bookId: book.id, reviewId: reviewId }));
    dispatch(getAllReviewsOfBookRequest({ bookId: book.id }));
  };

  const cancelEditReview = (reviewId: string) => {
    setEditedReview('');
    setIsEditing((prevState) => ({
      ...prevState,
      [reviewId]: false,
    }));
  };

  if (!book) return <p>책 정보를 불러오지 못했습니다.</p>;

  return (
    <Box data-testid="book-detail-box" sx={{ mt: { xs: 8, md: 16 } }}>
      <Container sx={{ mt: 5, mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          variant="scrollable"
          sx={{ backgroundColor: '#DADFCE', opacity: '90%', position: 'sticky', top: '0', width: '100%', zIndex: 1000 }}>
          {sections.map((section) => (
            <Tab key={section.id} label={section.label} value={section.id} />
          ))}
        </Tabs>
        {sections.map((section) => (
          <Box key={section.id} id={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} my={8}>
            <Typography variant="h4">{section.label}</Typography>
            {section.id === 'bookIntro' && (
              <Box component={Paper} sx={{ mt: 2, mb: 2, outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body1" dangerouslySetInnerHTML={{ __html: book.description || 'No description available' }} />
                </Box>
              </Box>
            )}
            {section.id === 'bookInfo' && <BookDetailBookInfo book={book} />}
            {section.id === 'author' && <BookDetailOtherByAuthor author={book.author} bookId={book.id} />}
            {section.id === 'reviews' && (
              <>
                {reviews.length > 0 &&
                  reviews.map((review, index) => (
                    <ReviewCard
                      key={index}
                      user={user}
                      review={review}
                      editedReviewContent={editedReview}
                      handleDeleteReview={deleteReview}
                      handleEditReview={editReview}
                      isEditing={isEditing}
                      handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeEditReview(event)}
                      handleOnClick={postReview}
                      handleOnClickCancel={cancelEditReview}
                    />
                  ))}
                <Review
                  handleOnClick={postReview}
                  handleOnChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeReview(event)}
                  review={review}
                />
              </>
            )}
            {section.id === 'delivery' && <BookDetailShippingPolicy />}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default BookDetails;
