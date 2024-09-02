import { useState } from 'react';

// import { mockBooks } from '@/app/models/book';
import { RootState } from '@/app/reducers';
import { Container, Typography, Grid, Box, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

import BookCard from './BookCard';

interface BookContainerProps {
  title: string;
}

const BooksContainer: React.FC<BookContainerProps> = ({ title }) => {
  const [page, setPage] = useState(1);
  // const books = mockBooks;
  const { books } = useSelector((store: RootState) => store.book);

  const booksPerPage = 8; //한페이지에 표시할 책의 수
  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log('Books:', books);
  console.log('Page Count:', pageCount);

  const displayedBooks = books.slice((page - 1) * booksPerPage, page * booksPerPage);
  console.log('디스플레이되는 책들: ', displayedBooks);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        marginTop: '20px', // 페이지네이션과의 간격 조정
      }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {displayedBooks.map((book, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={index} book={book} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <Pagination
            count={pageCount} // 페이지네이션에서 보여줄 전체 페이지 수
            page={page} //현재 선택된 페이지 번호
            onChange={handlePageChange} //사용자가 페이지 번호를 변경할 때 호출되는 콜백 함수
            color="primary"
            showFirstButton //"첫 페이지로 이동" 버튼을 표시
            showLastButton //"마지막 페이지로 이동" 버튼
            sx={{
              justifyContent: 'center',
              '& .MuiPagination-ul': {
                flexWrap: 'nowrap', // 페이지네이션 한 줄로 유지
              },
              '& .MuiPaginationItem-root': {
                minWidth: '32px', // 아이템의 최소 너비 설정
                height: '32px', // 아이템의 높이 설정
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default BooksContainer;
