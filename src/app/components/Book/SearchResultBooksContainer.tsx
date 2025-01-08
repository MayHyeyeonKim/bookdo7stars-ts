import { useState, useEffect } from 'react';

import { IsbnType } from '@/app/search/types/isbnType';
import { SearchType } from '@/app/search/types/searchType';
import { useMediaQuery, Container, Typography, Grid, Box, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import BookDetailCard from './BookDetailCard';
import { Book } from '../../models/book';
import ActionButtons from '../Buttons/ActionButtons';
import ToggleButtons from '../Buttons/ToggleButtons';
import CustomPagination from '../CustomPagination';
import ResultFilters from '../Result/ResultFilters';
import { getTitle } from '@/utils/pageUtils';
interface SearchResultBooksContainerProps {
  books: Book[];
  count: number;
  booksPerPage: number;
  searchTerm?: string;
  resultCount: number;
  parsedSearchCondition: SearchType;
  parsedIsbn: IsbnType;
}

const SearchResultBooksContainer: React.FC<SearchResultBooksContainerProps> = ({
  resultCount,
  books,
  count,
  booksPerPage,
  parsedSearchCondition,
  parsedIsbn,
}) => {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const pageCount = Math.ceil(count / booksPerPage);
  const theme = useTheme();

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

  const pageTitle = getTitle(resultCount, parsedSearchCondition);

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px', // 'mb' 대신 표준 CSS 속성 사용
  };
  const toggleBoxStyle = {
    borderBottom: '0.5px solid #ccc',
    paddingBottom: '0px',
  };
  const toggleButtonStyle = {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  };
  const actionButtonNames = ['전체 선택', '장바구니 담기', '보관함 담기', '마이리스트 담기'];

  const actionButtonStyle = {
    border: `1px solid ${theme.palette.primary.main}`,
  };
  const handleOnClick = (name: string) => {
    switch (name) {
      case '전체 선택': {
        if (selectedBooks.length === books.length) {
          setSelectedBooks([]);
        } else {
          setSelectedBooks(books.map((book) => book.id));
        }
      }
    }
  };
  const disabledButtons = (name: string): boolean => {
    if (name === '전체 선택') {
      return false;
    } else {
      return selectedBooks.length === 0;
    }
  };

  return (
    <Container
      className="search-result-books-container"
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
          <Box display="flex" alignItems="center" justifyContent="left" mb={4}>
            <Typography variant={'h4'} color="textPrimary" sx={{ color: 'gray' }}>
              {pageTitle}
            </Typography>
          </Box>
          <ToggleButtons boxStyle={toggleBoxStyle} buttonStyle={toggleButtonStyle} />
          <CustomPagination
            pageCount={pageCount}
            style={paginationStyle}
            booksPerPage={booksPerPage}
            parsedSearchCondition={parsedSearchCondition}
            parsedIsbn={parsedIsbn}
          />
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
            <ActionButtons names={actionButtonNames} handleOnClick={handleOnClick} disabledButtons={disabledButtons} style={actionButtonStyle} />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <ResultFilters />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box className="book-card-box" sx={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
                {books.map((book, index) => (
                  <Box className="book-detail-card" key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', zIndex: 'revert-layer' }}>
                    <Checkbox checked={selectedBooks.includes(book.id)} onChange={() => handleCheckboxChange(book.id)} />
                    <BookDetailCard key={index} book={book} />
                  </Box>
                ))}
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
