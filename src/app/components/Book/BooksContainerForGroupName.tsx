import { Container, Typography, Grid, Box } from '@mui/material';

import BookCard from './BookCard';
import { Book } from '../../models/book';

interface BookContainerProps {
  books: Book[];
  title: string;
}

const BooksContainerForGroupName: React.FC<BookContainerProps> = ({ books, title }) => {
  const displayedBooks = books;

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
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '100%', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '20px' }}>
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
      </Box>
    </Container>
  );
};

export default BooksContainerForGroupName;
