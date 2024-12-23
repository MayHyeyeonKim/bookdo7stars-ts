'use client';

import React, { useEffect, useState } from 'react';

import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getItemsInCartRequest, updateCartItemQuantityRequest } from '../actions/types';
import CartCard from '../components/Cart/CartCard';
import {removeFromCartRequest} from '@/app/actions/types';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
  console.log("localQuantities: ", localQuantities)

  //Sync local quantities with Redux state when items change
useEffect(() => {
  if (items.length > 0) {
    const initialQuantities = items.reduce((acc, item) => {
      if (item.book?.id) {
        acc[item.book.id.toString()] = item.quantity;
      }
      return acc;
    }, {} as Record<string, number>);
    setLocalQuantities(initialQuantities);
  }
}, [items]);
  
  const handleChange = (id: string, isChecked: boolean) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: isChecked,
    }));
  };

    const handleIncrease = (id: string, quantity: number) => {
      const newQuantity = quantity + 1;
      setLocalQuantities((prev) => ({
        ...prev,
        [id]: newQuantity, // 특정 id만 업데이트
      }));
      dispatch(updateCartItemQuantityRequest(Number(id), newQuantity));
    };
    
    const handleDecrease = (id: string, quantity: number) => {
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        setLocalQuantities((prev) => ({
          ...prev,
          [id]: newQuantity, // 특정 id만 업데이트
        }));
        dispatch(updateCartItemQuantityRequest(Number(id), newQuantity));
      }
    };
    
  useEffect(() => {
    dispatch(getItemsInCartRequest());
  }, []);

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

  // 아이템 삭제
  const handleCartDelete = (bookId: string) => {
    dispatch(removeFromCartRequest(bookId))
    dispatch(getItemsInCartRequest());
  }

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
            quantity={localQuantities[item.book.id.toString()]}
            handleIncrease={() => handleIncrease(item.book.id.toString(), localQuantities[item.book.id.toString()])}
            handleDecrease={() => handleDecrease(item.book.id.toString(), localQuantities[item.book.id.toString()])}
            handleCheckboxChange={handleCheckboxChange}
            checkedIds={checkedIds}
            handleCartDelete={() => handleCartDelete(item.book.id.toString())}
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
