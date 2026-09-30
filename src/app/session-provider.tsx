'use client';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { checkSessionRequest, getItemsInCartRequest, setQuantityInLocalstorage } from './actions/types';
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

  let _items: string | null = null;

  if (typeof window !== 'undefined') {
    _items = localStorage.getItem('cartItems');
  }

  const items = _items ? JSON.parse(_items) : [];
  useEffect(() => {
    if (isAddToCartDone) {
      toast.success(`${addToCartSuccessMessage}`);
    }
  }, [isAddToCartDone]);

  useEffect(() => {
    if (user || isAddToCartDone) {
      dispatch(getItemsInCartRequest());
    } else {
      dispatch(setQuantityInLocalstorage({ totalItems: items.length }));
    }
  }, [user, _items, isAddToCartDone]);

  useEffect(() => {
    if (!user) {
      dispatch(checkSessionRequest());
    }
  }, [user]);

  return <>{children}</>;
};

export default SessionProvider;
