'use client';
import { useEffect, useState } from 'react';

import { Container, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getBooksByGroupNameRequest, resetBooks } from '../../actions/types';
import BooksContainerForGroupName from '../../components/Book/BooksContainerForGroupName';
import { RootState } from '../../reducers';
import { AppDispatch } from '../../store/store';

const ItemNewSpecial = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books } = useSelector((store: RootState) => store.book);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    dispatch(resetBooks());
    dispatch(getBooksByGroupNameRequest('ItemNewAll', page, 20));
  }, []);

  const handleClickMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getBooksByGroupNameRequest('ItemNewAll', nextPage, 20));
  };

  return (
    <>
      <Container data-testid="books-container" sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <BooksContainerForGroupName books={books} title={'Item New Special Books'} />
        <Button size="large" onClick={handleClickMore}>
          more
        </Button>
      </Container>
    </>
  );
};

export default ItemNewSpecial;
