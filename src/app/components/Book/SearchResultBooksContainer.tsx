import { useState, useEffect, ChangeEvent } from 'react';

import { getBooksSearchRequest } from '@/app/actions/types';
import { SearchType } from '@/app/search/types/searchType';
import { AppDispatch } from '@/app/store/store';
import { useMediaQuery, Container, Typography, Grid, Box, Pagination, Checkbox, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import SearchResultBookCard from './SearchResultBookCard';
import { Book } from '../../models/book';
import ResultFilters from '../Result/ResultFilters';

interface SearchResultBooksContainerProps {
  books: Book[];
  title: string;
  count: number;
  booksPerPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  currentPage: number;
  searchTerm: string;
  resultCount: number;
  parsedSearchCondition: SearchType;
}

const SearchResultBooksContainer: React.FC<SearchResultBooksContainerProps> = ({
  resultCount,
  books,
  count,
  title,
  handlePageChange,
  booksPerPage,
  currentPage,
  parsedSearchCondition,
}) => {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('');
  const pageCount = Math.ceil(count / booksPerPage);
  const dispatch = useDispatch<AppDispatch>();

  const isWidth900Up = useMediaQuery('(min-width:900px)');

  const handleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book.id));
    }
  };

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
    const updatedSearchCondition: SearchType = {
      ...parsedSearchCondition,
      orderTerm: newSortBy,
    };
    dispatch(getBooksSearchRequest(updatedSearchCondition));
  };

  const getTitle = (parsedSearchCondition: SearchType) => {
    if (parsedSearchCondition.searchTerm) {
      return parsedSearchCondition.searchTerm + ` 의 검색 결과 총 ${resultCount}건`;
    } else {
      const resultString = Object.entries(parsedSearchCondition)
        .filter(([key, value]) => value !== '' && key !== 'page' && key !== 'pageSize' && key !== 'orderTerm')
        .map(([_, value]) => `${value}`)
        .join(' + ');
      return resultString + ` 의 검색 결과 총 ${resultCount}건`;
    }
  };

  const pageTitle = getTitle(parsedSearchCondition);

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
      {books.length > 0 ? (
        <>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Typography
              variant="h3"
              component="div"
              gutterBottom
              sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
              {title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Typography variant="h6" color="textPrimary" sx={{ color: 'gray' }}>
              {pageTitle}
            </Typography>
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

          <Box sx={{ display: 'flex', width: '100%', alignItems: 'end', justifyContent: 'end', gap: '12px', marginBottom: '20px' }}>
            <Button variant="outlined" onClick={handleSelectAll}>
              {selectedBooks.length === books.length ? '전체 해제' : '전체 선택'}
            </Button>
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ paddingRight: '16px' }}>
              <ResultFilters />
            </Grid>
            <Grid item xs={12} md={9} sx={{ paddingLeft: isWidth900Up ? '200px !important' : '0px' }}>
              <Box>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {books.map((book, index) => (
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
                        <SearchResultBookCard key={index} book={book} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6">검색 결과가 없습니다.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchResultBooksContainer;
