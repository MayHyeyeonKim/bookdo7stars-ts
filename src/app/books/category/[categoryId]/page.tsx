'use client';

import { useEffect, useState } from 'react';

import { getBooksByCategoryRequest, getCategoriesByIdRequest, getCategoryByIdRequest, setSelectedBooks } from '@/app/actions/types';
import BookDetailCard from '@/app/components/Book/BookDetailCard';
import ActionButtons from '@/app/components/Buttons/ActionButtons';
import ToggleButtons from '@/app/components/Buttons/ToggleButtons';
import CategoryList from '@/app/components/Category/CategoryList';
import CustomPagination from '@/app/components/CustomPagination';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { CartItemDto } from '@/app/models/cart';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { addToCart } from '@/utils/cartUtils';
import { getTitle } from '@/utils/pageUtils';
import { Box, Checkbox, Grid, Typography, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const CategoryBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesById, selectedCategory, isGetCategoryByIdLoading, isGetCategoryByIdDone } = useSelector((store: RootState) => store.category);
  const { categoryBooks, count, sortBy, currentPage, selectedBooks } = useSelector((store: RootState) => store.book);
  const { user } = useSelector((store: RootState) => store.user);
  const { isAddToCartDone } = useSelector((store: RootState) => store.cart);
  const [selectedBookIds, setSelectedBookIds] = useState<number[]>([]);
  const theme = useTheme();

  const { categoryId } = useParams<{ categoryId: string }>();

  const booksPerPage = 20;
  const pageCount = Math.ceil(count / booksPerPage);

  useEffect(() => {
    if (!categoriesById[categoryId + ' ']) {
      dispatch(getCategoriesByIdRequest(categoryId));
    }
  }, [categoriesById, dispatch]);

  useEffect(() => {
    if (selectedBookIds.length !== 0) {
      const selectedBooks = categoryBooks.filter((book) => selectedBookIds.includes(book.id));
      dispatch(setSelectedBooks(selectedBooks));
    }
  }, [selectedBookIds]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        getBooksByCategoryRequest({
          categoryId: categoryId,
          page: currentPage,
          pageSize: booksPerPage,
          orderTerm: sortBy,
          categoryName: selectedCategory.name,
        }),
      );
    }
  }, [categoryId, selectedCategory, sortBy]);

  const handleCheckboxChange = (bookId: number) => {
    setSelectedBookIds((prevSelectedBookIds) =>
      prevSelectedBookIds.includes(bookId) ? prevSelectedBookIds.filter((id) => id !== bookId) : [...prevSelectedBookIds, bookId],
    );
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryByIdRequest(categoryId));
    }
  }, []);

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px', // 'mb' 대신 표준 CSS 속성 사용
  };
  const toggleBoxStyle = {
    borderBottom: '0.5px solid #ccc',
    paddingBottom: '0px',
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const toggleButtonStyle = {
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  };
  const actionButtonNames = ['전체 선택', '장바구니 담기', '보관함 담기'];
  const handleOnClick = (name: string) => {
    switch (name) {
      case '전체 선택': {
        if (selectedBookIds.length === categoryBooks.length) {
          setSelectedBookIds([]);
        } else {
          setSelectedBookIds(categoryBooks.map((book) => book.id));
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
    }
  };
  const disabledButtons = (name: string): boolean => {
    if (name === '전체 선택') {
      return false;
    } else {
      return selectedBookIds.length === 0;
    }
  };
  const actionButtonStyle = {
    border: `1px solid ${theme.palette.primary.main}`,
  };

  const pageTitle = getTitle(count, undefined, isGetCategoryByIdDone && selectedCategory ? selectedCategory : undefined);

  return (
    <>
      {isGetCategoryByIdLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={3} sx={{ marginTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
          <Grid item xs={12} md={3} className="category-list">
            <Box sx={{ top: 0, position: 'sticky', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '5rem' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0px 4px 10px #AFC6AA',
                  borderRadius: '4px',
                  minWidth: '250px',
                  height: '80px',
                  maxWidth: '350px',
                }}>
                <Typography variant="h4" sx={{ color: 'gray' }}>
                  {pageTitle}
                </Typography>
              </Box>
              <Box
                sx={{
                  boxShadow: '0px 4px 10px #AFC6AA',
                  borderRadius: '4px',
                  minWidth: { xs: '200px', sm: '200px', md: '250px', lg: '250px' }, // Breakpoints에 따라 조정
                  maxWidth: { xs: '300px', sm: '300px', md: '350px', lg: '350px' },
                  minHeight: { xs: '400px', sm: '500px', md: '400px', lg: '800px' },
                  maxHeight: { xs: '600px', sm: '700px', md: '500px', lg: '1000px' },
                  overflowY: 'auto',
                  marginBottom: '1rem',
                }}
                className="category-list">
                <CategoryList categories={categoriesById} categoryId={categoryId} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9} className="category-books-container-grid">
            <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
              <Typography variant={'h4'} color="textPrimary" sx={{ color: 'gray' }}>
                {pageTitle}
              </Typography>
            </Box>
            <ToggleButtons boxStyle={toggleBoxStyle} buttonStyle={toggleButtonStyle} />
            <CustomPagination
              pageCount={pageCount}
              style={paginationStyle}
              booksPerPage={booksPerPage}
              categoryId={categoryId}
              selectedCategory={selectedCategory}
            />
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
              <ActionButtons names={actionButtonNames} handleOnClick={handleOnClick} disabledButtons={disabledButtons} style={actionButtonStyle} />
            </Box>
            <Box className="book-card-box" sx={{ display: 'flex', flexDirection: 'column' }}>
              {categoryBooks.map((book, index) => (
                <Box
                  className="book-detail-card"
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', zIndex: 'revert-layer', justifyContent: 'center' }}>
                  <Checkbox checked={selectedBookIds.includes(book.id)} onChange={() => handleCheckboxChange(book.id)} />
                  <BookDetailCard key={index} book={book} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default CategoryBookPage;
