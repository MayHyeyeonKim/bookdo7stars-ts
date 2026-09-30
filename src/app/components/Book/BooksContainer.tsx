import { Container, Typography, Grid, Box } from '@mui/material';

import BookCard from './BookCard';
import { Book } from '../../models/book';
import CustomPagination from '../CustomPagination';

interface BookContainerProps {
  books: Book[];
  title: string;
  booksPerPage: number;
  pageCount: number;
}

const BooksContainer: React.FC<BookContainerProps> = ({ books, title, booksPerPage, pageCount }) => {
  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px', // 'mb' 대신 표준 CSS 속성 사용
  };
  return (
    <Container
      className="all-books-container"
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {books.map((book, index) => (
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
      <CustomPagination pageCount={pageCount} style={paginationStyle} booksPerPage={booksPerPage} />
    </Container>
  );
};

export default BooksContainer;
