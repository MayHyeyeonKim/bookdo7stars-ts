'use client';

import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequest } from '../actions';
import { AppDispatch, AppState } from '../store/store';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: AppState) => store.user);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#035036',
          height: '60px',
          p: 1,
          textAlign: 'center',
        }}>
        <Typography sx={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.875rem' : '1rem' }}>Free Standard Shipping on all orders over $100</Typography>
      </Box>
      <Link href={'/'}>Home</Link>
      {user ? (
        <Link href={'/'} onClick={handleLogout}>
          {' '}
          Log out{' '}
        </Link>
      ) : (
        <Link href={'/login'}> Log in </Link>
      )}
      <Link href={'/register'}>Register</Link>
    </>
  );
};

export default Header;
