// import { mockBooks } from '@/app/models/book';
import { RootState } from '@/app/reducers';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import BookCard from './BookCard';

const BooksContainer = () => {
  // const books = mockBooks;
  const { books } = useSelector((store: RootState) => store.book);
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {books.map((book, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BookCard key={index} book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BooksContainer;
