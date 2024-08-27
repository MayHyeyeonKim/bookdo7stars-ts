'use client';

import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchIcon from '@mui/icons-material/Search';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { alpha, AppBar, Box, Button, IconButton, InputAdornment, styled, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequest } from '../actions/constants';
import { AppDispatch, AppState } from '../store/store';
import CategoryBar from './CategoryBar';

const StyledSearchField = styled(TextField)(({ theme }) => ({
  position: 'relative',
  borderBottomLeftRadius: theme.shape.borderRadius,
  borderTopLeftRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: 0,
  marginLeft: 2,
  height: '40px',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: '70%',
    height: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(3),
    width: '40%',
    height: '40px',
  },
  color: 'inherit',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none', // 기본 아웃라인(border) 제거
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
}));

const StyledButtonSearch = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  borderBottomRightRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  height: '40px',
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    height: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '20px',
    height: '40px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up('md')]: {
    width: '120px',
    height: '40px',
  },
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLogoutDone } = useSelector((store: AppState) => store.user);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
    if (isLogoutDone) {
      router.push('/');
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleSession = async () => {
    const res = await axios.get('/session');
  };

  return (
    <Box>
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
        <Typography sx={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.875rem' : '1rem' }}>
          Free shipping on all orders over $100. (Standard Shipping)
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar>
            {!isMobile && (
              <Button
                onClick={handleHome}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: 'transparent', // 클릭(active) 시 배경색 제거
                    boxShadow: 'none', // 클릭(active) 시 그림자 제거
                  },
                  cursor: 'pointer',
                }}>
                <Image src={'/images/logo1.png'} alt="logo" width={150} height={100} />
              </Button>
            )}
            <Box sx={{ flexGrow: 0.5 }} />
            <StyledSearchField
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: isMobile ? { fontSize: '0.75rem' } : {}, // 모바일에서 글자 크기 조정
              }}></StyledSearchField>
            <StyledButtonSearch>Search</StyledButtonSearch>
            <Box sx={{ flexGrow: 0.7 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!user ? (
                !isMobile ? (
                  <>
                    <StyledButton onClick={handleLogin}>Login</StyledButton>
                    <StyledButton onClick={handleRegister}>Register</StyledButton>
                  </>
                ) : (
                  <>
                    <IconButton size="large" onClick={handleLogin}>
                      <LoginRoundedIcon />
                    </IconButton>
                    <IconButton size="large" onClick={handleRegister}>
                      <HowToRegRoundedIcon />
                    </IconButton>
                  </>
                )
              ) : !isMobile ? (
                <>
                  <StyledButton onClick={handleLogout}>Log out</StyledButton>
                  <StyledButton onClick={handleSession}>My Page</StyledButton>
                </>
              ) : (
                <>
                  <IconButton size="large" onClick={handleLogout}>
                    <LogoutRoundedIcon />
                  </IconButton>
                  <IconButton size="large">
                    <SentimentVerySatisfiedRoundedIcon onClick={handleSession} />
                  </IconButton>
                </>
              )}
              {!isMobile ? (
                <StyledButton onClick={handleSession}>Cart</StyledButton>
              ) : (
                <IconButton size="large">
                  <ShoppingCartRoundedIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <CategoryBar />
    </Box>
  );
};

export default Header;
