import {
  Paper,
  Container,
  Box,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from '@mui/material';

import { Book } from '../../../models/book';

interface BookDetailBookInfoProps {
  book: Book | null;
}

const BookDetailBookInfo: React.FC<BookDetailBookInfoProps> = ({ book }) => {
  if (!book) {
    return <p> no book! go back!</p>;
  }
  return (
    <Container>
      <Box>
        <TableContainer component={Paper} sx={{ mt: 2, mb: 5 }}>
          <Table sx={{ outline: '1px solid #DFE4DF' }}>
            <TableBody sx={{ outline: '1px solid #DFE4DF' }}>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell
                  sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>
                  ISBN
                </TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>
                  {book.isbn}
                </TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell
                  sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>
                  Publication Date
                </TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>
                  {book.pubDate
                    ? new Date(book.pubDate).toLocaleDateString('en-GB', { timeZone: 'UTC' })
                    : 'N/A'}
                </TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell
                  sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>
                  Category
                </TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>
                  {book.categoryName}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default BookDetailBookInfo;
