'use client';

import React, { useEffect, useState } from 'react';

import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  deleteCartItemRequest,
  getItemsInCartRequest,
  setQuantityInLocalstorage,
  setSelectedItemsForOrder,
  setTotalPrice,
  updateCartItemRequest,
} from '../actions/types';
import CartCard from '../components/Cart/CartCard';
import { CartItem } from '../models/cart';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isUpdateCartItemDone, isDeleteCartItemDone } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((store: RootState) => store.user);
  const [itemsFromLocalstorage, setItemsFromLocalstorage] = useState<CartItem[]>([]);

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const itemsInLocalStorage = localStorage.getItem('cartItems');
  const itemsInArray = itemsInLocalStorage ? JSON.parse(itemsInLocalStorage) : [];

  const router = useRouter();

  useEffect(() => {
    if (user || isUpdateCartItemDone || isDeleteCartItemDone) {
      dispatch(getItemsInCartRequest());
    } else {
      setItemsFromLocalstorage(itemsInArray);
    }
  }, [user, isUpdateCartItemDone, isDeleteCartItemDone]);

  const cartItems = user ? items : itemsFromLocalstorage;

  // 전체 선택/해제
  const handleToggleSelectAll = () => {
    if (checkedItems.length === cartItems.length) {
      cartItems.map((item) => {
        setCheckedIds((prev) => ({
          ...prev,
          [item.book.id.toString()]: false,
        }));
      });
    } else {
      cartItems.map((item) => {
        setCheckedIds((prev) => ({
          ...prev,
          [item.book.id.toString()]: true,
        }));
      });
    }
  };

  // 개별 체크박스
  const handleCheckboxChange = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: event.target.checked,
    }));
  };

  const checkedItems = Object.entries(checkedIds)
    .filter(([, value]) => value)
    .map(([key]) => key);

  // 수량 증가
  const handleIncrease = (id: string, quantity: number) => {
    if (user) {
      const updatedQuantity = quantity + 1;
      dispatch(updateCartItemRequest({ bookId: id, quantity: updatedQuantity }));
    } else {
      const existingCartItemIndex = itemsInArray.findIndex((item: CartItem) => item.book.id.toString() === id);
      if (existingCartItemIndex !== -1) {
        itemsInArray[existingCartItemIndex].quantity += 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(itemsInArray));
      setItemsFromLocalstorage(itemsInArray);
      dispatch(setQuantityInLocalstorage({ totalItems: itemsInArray.length }));
    }
  };

  // 수량 감소
  const handleDecrease = (id: string, quantity: number) => {
    if (user) {
      const updatedQuantity = quantity - 1;
      dispatch(updateCartItemRequest({ bookId: id, quantity: updatedQuantity }));
    } else {
      const existingCartItemIndex = itemsInArray.findIndex((item: CartItem) => item.book.id.toString() === id);
      if (existingCartItemIndex !== -1) {
        itemsInArray[existingCartItemIndex].quantity -= 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(itemsInArray));
      setItemsFromLocalstorage(itemsInArray);
      dispatch(setQuantityInLocalstorage({ totalItems: itemsInArray.length }));
    }
  };

  // 아이템 삭제
  const handleDelete = (id: string) => {
    if (user) {
      dispatch(deleteCartItemRequest({ bookId: id }));
    } else {
      const updatedItems = itemsInArray.filter((item: CartItem) => item.book.id.toString() !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      setItemsFromLocalstorage(updatedItems);
      dispatch(setQuantityInLocalstorage({ totalItems: updatedItems.length }));
    }
  };

  // 총 금액 및 상품 수 계산
  const selectedItems = cartItems.filter((item) => checkedItems.includes(item.book.id.toString()));

  let totalPrice: number;
  let totalItems;
  if (selectedItems) {
    totalPrice = selectedItems.reduce((sum, item) => sum + item.quantity * item.book.priceSales, 0);
    totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  const goToOrderPage = () => {
    dispatch(setSelectedItemsForOrder(selectedItems));
    dispatch(setTotalPrice(totalPrice));
    if (user) {
      router.push(`/order/${user?.id}`);
    } else {
      toast.error('You must be logged in first!');
      router.push('/login');
    }
  };

  return (
    <Box sx={{ mt: '50px' }} p={2} maxWidth="800px" mx="auto">
      {/* Select All / Deselect All Button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="outlined" onClick={handleToggleSelectAll}>
          {checkedItems.length === cartItems.length ? '전체 해제' : '전체 선택'}
        </Button>
      </Box>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartCard
            key={item.id}
            book={item.book}
            quantity={item.quantity}
            handleCheckboxChange={handleCheckboxChange}
            checkedIds={checkedIds}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <Typography variant="h6" textAlign="center">
          장바구니가 비어있습니다.
        </Typography>
      )}

      {/* Summary Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 1, mb: 2, p: 2, backgroundColor: '#f9f9f9' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              총 상품가격: <b>₩{totalPrice!.toLocaleString()}</b> (1,500원 할인)
            </Typography>
            <Typography>
              배송비: <b>2,500원</b>
            </Typography>
            <Typography>
              총 주문 상품수: <b>{totalItems}개</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              멤버십 마일리지: <b>0원</b>
            </Typography>
            <Typography>
              상품 마일리지: <b>750원</b> (5%)
            </Typography>
            <Typography color="primary">
              5만 원 이상 추가 마일리지: <b>0원</b>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, borderTop: '1px solid #ddd', pt: 2 }}>
          <Typography variant="h6">
            총 결제 예상 금액: <b>₩{totalPrice!.toLocaleString()}</b>
          </Typography>
          <Typography variant="h6">
            총 적립 예상 마일리지: <b>750원</b>
          </Typography>
        </Box>
      </Box>

      {/* Order Button */}
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" disabled={checkedItems.length === 0} onClick={goToOrderPage}>
          선택 상품 주문하기
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
