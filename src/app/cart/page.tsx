'use client';

import React, { useEffect, useState } from 'react';

import { removeFromCartRequest, getItemsInCartRequest } from '@/app/actions/types';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CartCard from '../components/Cart/CartCard';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const handleChange = (id: string, isChecked: boolean) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

  useEffect(() => {
    dispatch(getItemsInCartRequest());
  }, []);

  const handleCartDelete = (bookId: string) => {
    dispatch(removeFromCartRequest(bookId));
    dispatch(getItemsInCartRequest());
  };

  // 전체 선택/해제
  const handleToggleSelectAll = () => {
    if (checkedItems.length === items.length) {
      items.map((item) => {
        setCheckedIds((prev) => ({
          ...prev,
          [item.book.id.toString()]: false,
        }));
      });
    } else {
      items.map((item) => {
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
    .filter(([key, value]) => value)
    .map(([key]) => key);

  // 수량 증가
  const handleIncrease = (id: string, quantity: number) => {
    // dispatch(updateCartItemQuantity(id, quantity + 1));
  };

  // 수량 감소
  const handleDecrease = (id: string, quantity: number) => {
    if (quantity > 1) {
      // dispatch(updateCartItemQuantity(id, quantity - 1));
    }
  };

  // 아이템 삭제
  const handleDelete = (id: string) => {
    // dispatch(removeFromCart(id));
    // setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  // 총 금액 및 상품 수 계산
  const selectedItems = items.filter((item) => checkedItems.includes(item.book.id.toString()));

  let totalPrice;
  let totalItems;
  if (selectedItems) {
    totalPrice = selectedItems.reduce((sum, item) => sum + item.quantity * item.book.priceSales, 0);
    totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  return (
    <Box sx={{ mt: '50px' }} p={2} maxWidth="800px" mx="auto">
      {/* Select All / Deselect All Button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="outlined" onClick={handleToggleSelectAll}>
          {checkedItems.length === items.length ? '전체 해제' : '전체 선택'}
        </Button>
      </Box>

      {/* Cart Items */}
      {items.length > 0 ? (
        items.map((item) => (
          <CartCard
            key={item.id}
            book={item.book}
            quantity={item.quantity}
            handleCheckboxChange={handleCheckboxChange}
            checkedIds={checkedIds}
            handleCartDelete={handleCartDelete}
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
              총 상품가격: <b>₩{totalPrice?.toLocaleString()}</b> (1,500원 할인)
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
            총 결제 예상 금액: <b>16,000원</b>
          </Typography>
          <Typography variant="h6">
            총 적립 예상 마일리지: <b>750원</b>
          </Typography>
        </Box>
      </Box>

      {/* Order Button */}
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" disabled={checkedItems.length === 0}>
          선택 상품 주문하기
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
