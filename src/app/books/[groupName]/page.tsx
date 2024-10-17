'use client';

import { useEffect, useState } from 'react';

import { getBooksByGroupRequest, resetGroupBooks } from '@/app/actions/types';
import GroupBooksContainer from '@/app/components/Book/GroupBooksContainer';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { bookGroups, QueryTypes } from '../constants';

const GroupBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { groupBooks, isGetBooksByGroupLoading, pageSize } = useSelector((store: RootState) => store.book);
  const [page, setPage] = useState<number>(1);

  const { groupName } = useParams<{ groupName: string }>();

  useEffect(() => {
    dispatch(resetGroupBooks());
  }, [groupName]);

  useEffect(() => {
    dispatch(getBooksByGroupRequest({ groupName: groupName, page: page, pageSize: pageSize }));
  }, [page]);

  const handleSeeMore = () => {
    setPage((prev) => prev + 1);
  };

  const title = bookGroups[groupName as QueryTypes];

  return (
    <>
      <GroupBooksContainer books={groupBooks} handleSeeMore={handleSeeMore} isGetBooksByGroupLoading={isGetBooksByGroupLoading} title={title} />
    </>
  );
};
export default GroupBookPage;
