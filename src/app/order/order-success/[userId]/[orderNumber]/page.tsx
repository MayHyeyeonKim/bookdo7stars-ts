'use client';

import { useEffect } from 'react';

import { RootState } from '@/app/reducers';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OrderSuccessPage = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const { orderNumber } = useSelector((store: RootState) => store.order);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      toast.error('you must login!');
      router.push('/login');
    }
  }, [user]);
  return (
    <Box textAlign="center" mb={4} sx={{ height: '100vh', alignContent: 'center' }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        주문완료
      </Typography>
      <Typography variant="body1" color="textSecondary">
        주문이 완료되었습니다.
      </Typography>
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
        주문번호: {orderNumber}
      </Typography>
    </Box>
  );
};

export default OrderSuccessPage;
