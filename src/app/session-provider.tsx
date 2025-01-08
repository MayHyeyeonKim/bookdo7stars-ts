'use client';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { checkSessionRequest } from './actions/types';
import { RootState } from './reducers';
import { AppDispatch } from './store/store';

const SessionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: RootState) => store.user);
  const { isAddToCartDone, addToCartSuccessMessage } = useSelector((store: RootState) => store.cart);

  useEffect(() => {
    if (isAddToCartDone) {
      toast.success(`${addToCartSuccessMessage}`);
    }
  }, [isAddToCartDone]);

  useEffect(() => {
    if (!user) {
      dispatch(checkSessionRequest());
    }
  }, [user]);

  return <>{children}</>;
};

export default SessionProvider;
