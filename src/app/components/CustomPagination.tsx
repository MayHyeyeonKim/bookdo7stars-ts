import { useEffect } from 'react';

import { Box, SxProps, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest, getBooksByCategoryRequest, setPage } from '../actions/types';
import { ICategory } from '../models/category';
import { RootState } from '../reducers';
import { IsbnType } from '../search/types/isbnType';
import { SearchType } from '../search/types/searchType';
import { AppDispatch } from '../store/store';

type CustomPaginationProps = {
  pageCount: number;
  style?: SxProps;
  booksPerPage: number;
  categoryId?: string;
  selectedCategory?: ICategory;
  parsedSearchCondition?: SearchType;
  parsedIsbn?: IsbnType;
};

const CustomPagination = (props: CustomPaginationProps) => {
  const { pageCount, style, booksPerPage, categoryId, selectedCategory, parsedSearchCondition, parsedIsbn } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, sortBy } = useSelector((store: RootState) => store.book);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  useEffect(() => {
    if (categoryId && selectedCategory && !parsedSearchCondition && !parsedIsbn) {
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
    if (!categoryId && !parsedSearchCondition && !parsedIsbn) {
      dispatch(getAllBooksRequest(currentPage, booksPerPage));
    }
  }, [currentPage, parsedSearchCondition, parsedIsbn, categoryId, selectedCategory, dispatch]);

  return (
    <Box sx={{ ...style }}>
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
  );
};
export default CustomPagination;
