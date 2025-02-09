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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    setTimeout(() => {
      const sectionElement = sectionRefs.current[newValue];
      if (sectionElement) {
        window.scrollTo({ top: sectionElement.offsetTop - 50, behavior: 'smooth' });
      }
    }, 20);
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
                {reviews.map((review) => (
                  <ReviewCard key={review.id} user={user} review={review} handleEditReview={() => {}} handleDeleteReview={() => {}} />
                ))}
                <Review handleOnClick={() => {}} handleOnChange={(e) => setReview(e.target.value)} review={review} />
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
