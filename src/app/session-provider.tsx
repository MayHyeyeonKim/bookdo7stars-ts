'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store/store';
import { RootState } from './reducers';
import { useEffect } from 'react';
import { checkSessionRequest } from './actions/types';
import { toast } from 'react-toastify';

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
