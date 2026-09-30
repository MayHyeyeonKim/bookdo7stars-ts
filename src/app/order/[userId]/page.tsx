'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { makeAnOrderRequest } from '@/app/actions/types/order';
import { CardInfo, OrderContent, ShippingInfo } from '@/app/models/order';
import { AppDispatch } from '@/app/store/store';
import { alpha, Box, Button, Container, SelectChangeEvent, styled, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import AddressForm from '../../components/Order/AddressForm';
import CustomTable from '../../components/Order/CustomTable';
import PaymentInfoForm from '../../components/Order/PaymentInfoForm';
import { RootState } from '../../reducers';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  [theme.breakpoints.up('md')]: {
    width: '120px',
    height: '40px',
  },
}));
const OrderPage = () => {
  const { selectedItems, totalPrice } = useSelector((store: RootState) => store.cart);
  const { isMakeAnOrderDone, orderNumber } = useSelector((store: RootState) => store.order);
  const { user } = useSelector((store: RootState) => store.user);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isTableExpanded, setIsTableExpanded] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardType: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    zipCode: '',
    address1: '',
    address2: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!user) {
      toast.error('you must login!');
      router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    if (isMakeAnOrderDone && user && orderNumber) {
      console.log(orderNumber);
      router.push(`/order/order-success/${user.id}/${orderNumber}`);
    }
  }, [isMakeAnOrderDone, user, orderNumber]);

  const handleShippingInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setShippingInfo((prevInfo) => ({
            ...prevInfo,
            zipCode: data.zonecode,
            address1: data.address,
          }));
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            zipCode: '',
            address1: '',
          }));
        },
      }).open();
    };
    document.body.appendChild(script);
  };

  const handlePaymentMethodChange = (e: SelectChangeEvent) => {
    setPaymentMethod(e.target.value);
  };
  const handleCardInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name;
    setCardInfo({
      ...cardInfo,
      [targetName]: e.target.value,
    });
  };

  const handleCardTypeChange = (e: SelectChangeEvent) => {
    setCardInfo({
      ...cardInfo,
      cardType: e.target.value,
    });
  };

  const expandTable = () => {
    setIsTableExpanded((prev) => !prev);
  };

  const submit = () => {
    const orderContents: OrderContent = {
      shipInfo: shippingInfo,
      orderedItems: selectedItems,
      totalPrice: totalPrice,
    };

    dispatch(makeAnOrderRequest(orderContents));
  };

  return (
    <Container
      className="all-books-container"
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      {selectedItems.length > 0 ? (
        <Box>
          <Box sx={{ margin: '1rem 0rem', display: 'flex', justifyContent: 'flex-end' }}>
            <StyledButton onClick={expandTable}>{isTableExpanded ? '접기' : '더보기'}</StyledButton>
          </Box>
          <Box>
            <CustomTable items={selectedItems} isTableExpanded={isTableExpanded} />
          </Box>
        </Box>
      ) : (
        <Typography> 주문 내역이 없습니다.</Typography>
      )}
      <AddressForm shippingInfo={shippingInfo} handlePostcode={handlePostcode} handleShippingInfoChange={handleShippingInfoChange} errors={errors} />
      <PaymentInfoForm
        paymentMethod={paymentMethod}
        errors={errors}
        handleCardInfoChange={handleCardInfoChange}
        handleCardTypeChange={handleCardTypeChange}
        handlePaymentMethodChange={handlePaymentMethodChange}
        cardInfo={cardInfo}
      />
      <Box sx={{ marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={submit}>
          결제하기
        </Button>
      </Box>
    </Container>
  );
};

export default OrderPage;
