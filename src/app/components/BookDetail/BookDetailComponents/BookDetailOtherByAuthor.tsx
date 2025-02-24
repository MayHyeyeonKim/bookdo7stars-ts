import { useEffect, useState } from 'react';

import { getBooksAuthorSearchRequest, resetAuthorBooks } from '@/app/actions/types';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Book } from '../../../models/book';
import BookCard from '../../Book/BookCard';

interface BookDetailOtherByAuthorProps {
  author: string;
  bookId: number;
}

const BookDetailOtherByAuthor: React.FC<BookDetailOtherByAuthorProps> = ({ author, bookId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorBooks } = useSelector((store: RootState) => store.book);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(resetAuthorBooks());
    dispatch(getBooksAuthorSearchRequest(author, bookId, page, 6));
  }, [bookId]);

  const handleSeeMore = () => {
    setPage((prev) => prev + 1);
    dispatch(getBooksAuthorSearchRequest(author, bookId, page + 1, 6));
  };
  return (
    <Container>
      <Box id="author" my={4}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {authorBooks.map((book, index) => (
            <Grid
              data-testid="book-card"
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={index} book={book} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <LoadingButton loadingPosition="start" onClick={handleSeeMore} variant="contained" sx={{ '& .MuiLoadingButton-startIcon': { marginRight: '8px' } }}>
          See more
        </LoadingButton>
      </Box>
    </Container>
  );
};
export default BookDetailOtherByAuthor;
