import { useState } from 'react';

import { Container, Typography, Grid, Box, Pagination } from '@mui/material';

import BookCard from './BookCard';
import { Book } from '../../models/book';

interface BookContainerProps {
  books: Book[];
  title: string;
}

const BooksContainer: React.FC<BookContainerProps> = ({ books, title }) => {
  const [page, setPage] = useState(1);

  const booksPerPage = 8;
  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const displayedBooks = books.slice((page - 1) * booksPerPage, page * booksPerPage);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        marginTop: '20px',
      }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {displayedBooks.map((book, index) => (
            <Grid
              data-testid="book-card"
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={index} book={book} />
            </Grid>
          ))}
        </Grid>
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
      </Box>
    </Container>
  );
};

export default BooksContainer;
