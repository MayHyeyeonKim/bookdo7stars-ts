import LoadingButton from '@mui/lab/LoadingButton';
import { Container, Typography, Grid, Box } from '@mui/material';

import BookCard from './BookCard';
import { Book } from '../../models/book';

interface GroupBooksContainerProps {
  books: Book[];
  title: string;
  handleSeeMore: () => void;
  isGetBooksByGroupLoading: boolean;
}

const GroupBooksContainer: React.FC<GroupBooksContainerProps> = ({ books, title, handleSeeMore, isGetBooksByGroupLoading }) => {
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
          {books.map((book, index) => (
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
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <LoadingButton
          loading={isGetBooksByGroupLoading}
          loadingPosition="start"
          onClick={handleSeeMore}
          variant="contained"
          sx={{ '& .MuiLoadingButton-startIcon': { marginRight: '8px' } }}>
          See more
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default GroupBooksContainer;
