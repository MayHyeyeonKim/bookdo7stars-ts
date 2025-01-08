import { useEffect, useState } from 'react';

import { Book } from '@/app/models/book';
import { Typography, ToggleButtonGroup, ToggleButton, Pagination, Button, Grid, Checkbox } from '@mui/material';
import { Container, Box, useMediaQuery } from '@mui/system';

import BookDetailCard from './BookDetailCard';

type CategoryBooksContainerProps = {
  categoryBooks: Book[];
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  count: number;
  booksPerPage: number;
  currentPage: number;
};
const CategoryBooksContainer = (props: CategoryBooksContainerProps) => {
  const { categoryBooks, handlePageChange, count, booksPerPage, currentPage } = props;

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('');
  const pageCount = Math.ceil(count / booksPerPage);

  const isWidth900Up = useMediaQuery('(min-width:900px)');

  useEffect(() => {
    // console.log('선택된 책들: ', selectedBooks);
  }, [selectedBooks]);

  const handleAddToCart = () => {
    console.log('여기는 handleAddToCart입니다.');
  };
  const handleAddToWishlist = () => {
    console.log('여기는 handleAddToWishlist입니다.');
  };
  const handleAddToMyList = () => {
    console.log('여기는 handleAddToMyList입니다.');
  };

  const handleCheckboxChange = (bookId: number) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId) ? prevSelectedBooks.filter((id) => id !== bookId) : [...prevSelectedBooks, bookId],
    );
  };

  const handleSortChange = (event: React.MouseEvent<HTMLElement>, newSortBy: string) => {
    setSortBy(newSortBy);
  };

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
      {categoryBooks.length > 0 ? (
        <>
          <Box mb={2} sx={{ borderBottom: '0.5px solid #ccc', paddingBottom: '0px' }}>
            <ToggleButtonGroup value={sortBy} exclusive onChange={handleSortChange} aria-label="Sort options">
              <ToggleButton value="accuracy" aria-label="정확도순" sx={{ borderBottomLeftRadius: '0px' }}>
                정확도순
              </ToggleButton>
              <ToggleButton value="sales" aria-label="판매량순">
                판매량순
              </ToggleButton>
              <ToggleButton value="publication" aria-label="출간일순">
                출간일순
              </ToggleButton>
              <ToggleButton value="name" aria-label="상품명순">
                상품명순
              </ToggleButton>
              <ToggleButton value="rank" aria-label="평점순">
                평점순
              </ToggleButton>
              <ToggleButton value="lowPrice" aria-label="저가격순" sx={{ borderBottomRightRadius: '0px' }}>
                저가격순
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
            <Pagination
              count={pageCount}
              page={currentPage}
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

          <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', gap: '12px', marginBottom: '20px' }}>
            <Button variant="outlined">{/* {selectedBooks.length === books.length ? '전체 해제' : '전체 선택'} */}</Button>
            <Button variant="outlined" onClick={handleAddToCart} disabled>
              {'장바구니 담기'}
            </Button>
            <Button variant="outlined" onClick={handleAddToWishlist} disabled>
              {'보관함 담기'}
            </Button>
            <Button variant="outlined" onClick={handleAddToMyList} disabled>
              {'마이리스트 담기'}
            </Button>
          </Box>
          <Grid item xs={12} sx={{ paddingLeft: isWidth900Up ? '200px !important' : '0px' }}>
            <Box>
              <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {categoryBooks.map((book, index) => (
                  <Grid
                    data-testid="book-card"
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    // lg={8}
                    sx={{ paddingY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox checked={selectedBooks.includes(book.id)} onChange={() => handleCheckboxChange(book.id)} />
                      <BookDetailCard key={index} book={book} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6"> 해당 카테고리에 책이 없습니다.</Typography>
        </Box>
      )}
    </Container>
  );
};
export default CategoryBooksContainer;
