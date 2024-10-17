import { Paper, Container, Box, Typography, Table, TableRow, TableCell, TableContainer, TableBody } from '@mui/material';

import Book from '../../../models/book';

interface BookDetailBookInfoProps {
  book: Book | null;
}

const BookDetailBookInfo: REACT.FC<BookDetailBookInfoProps> = ({ book }) => {
  return (
    <Container>
      <Box>
        <TableContainer component={Paper} sx={{ mt: 2, mb: 5 }}>
          <Table sx={{ outline: '1px solid #DFE4DF' }}>
            <TableBody sx={{ outline: '1px solid #DFE4DF' }}>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>ISBN</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{book.isbn}</TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>Publication Date</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{book.pubDate}</TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>Category</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{book.categoryName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default BookDetailBookInfo;
