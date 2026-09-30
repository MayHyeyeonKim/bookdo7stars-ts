import { useState, useEffect } from 'react';

import { setSelectedBooks, toggleWishlistRequest } from '@/app/actions/types';
import { CartItemDto } from '@/app/models/cart';
import { RootState } from '@/app/reducers';
import { IsbnType } from '@/app/search/types/isbnType';
import { SearchType } from '@/app/search/types/searchType';
import { AppDispatch } from '@/app/store/store';
import { addToCart } from '@/utils/cartUtils';
import { getTitle } from '@/utils/pageUtils';
import { useMediaQuery, Container, Typography, Grid, Box, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import BookDetailCard from './BookDetailCard';
import { Book } from '../../models/book';
import ActionButtons from '../Buttons/ActionButtons';
import ToggleButtons from '../Buttons/ToggleButtons';
import CustomPagination from '../CustomPagination';
import ResultFilters from '../Result/ResultFilters';
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
  const { user } = useSelector((store: RootState) => store.user);
  const { isAddToCartDone } = useSelector((store: RootState) => store.cart);
  const { selectedBooks } = useSelector((store: RootState) => store.book);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBookIds, setSelectedBookIds] = useState<number[]>([]);
  const pageCount = Math.ceil(count / booksPerPage);
  const theme = useTheme();

  const isWidth900Up = useMediaQuery('(min-width:900px)');

  useEffect(() => {
    if (selectedBookIds.length !== 0) {
      const selectedBooks = books.filter((book) => selectedBookIds.includes(book.id));
      dispatch(setSelectedBooks(selectedBooks));
    }
  }, [selectedBookIds]);

  const handleCheckboxChange = (bookId: number) => {
    setSelectedBookIds((prevSelectedBookIds) =>
      prevSelectedBookIds.includes(bookId) ? prevSelectedBookIds.filter((id) => id !== bookId) : [...prevSelectedBookIds, bookId],
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
  const actionButtonNames = ['전체 선택', '장바구니 담기', '보관함 담기'];

  const actionButtonStyle = {
    border: `1px solid ${theme.palette.primary.main}`,
  };

  const handleOnClick = (name: string) => {
    switch (name) {
      case '전체 선택': {
        if (selectedBookIds.length === books.length) {
          setSelectedBookIds([]);
        } else {
          setSelectedBookIds(books.map((book) => book.id));
        }
        break;
      }
      case '장바구니 담기': {
        const cartItem: CartItemDto[] = [];
        selectedBookIds.map((bookId) => {
          return cartItem.push({ bookId: bookId, quantity: 1 });
        });
        if (user) {
          addToCart(cartItem, selectedBooks, dispatch, isAddToCartDone, user);
          setSelectedBookIds([]);
        } else {
          addToCart(cartItem, selectedBooks, dispatch, isAddToCartDone);
          setSelectedBookIds([]);
        }
        break;
      }
      case '보관함 담기': {
        dispatch(toggleWishlistRequest(selectedBookIds));
        setSelectedBookIds([]);
        break;
      }
    }
  };
  const disabledButtons = (name: string): boolean => {
    if (name === '전체 선택') {
      return false;
    } else {
      return selectedBookIds.length === 0;
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
                    <Checkbox checked={selectedBookIds.includes(book.id)} onChange={() => handleCheckboxChange(book.id)} />
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
