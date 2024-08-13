'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Container, Box, Grid, Typography, TextField, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { loginRequest } from '../actions';
import { AppDispatch, AppState } from '../store/store';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoginDone, isLoginError } = useSelector((store: AppState) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoginDone) {
      toast.success('Login successful!');
      router.push('/');
    }
  }, [isLoginDone]);

  useEffect(() => {
    if (isLoginError) {
      toast.error(isLoginError);
    }
  }, [isLoginError]);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    dispatch(loginRequest({ email: formData.email, password: formData.password }));

    setFormData({
      email: '',
      password: '',
    });
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();

    const targetName = event.target.name;
    const targetValue = event.target.value;

    setFormData({ ...formData, [targetName]: targetValue });
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={6} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2, p: 4, mr: 2, width: '100%' }}>
              <Typography component="h1" gutterBottom>
                Login
              </Typography>
              <Box component="form" onSubmit={handleOnSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  autoComplete="email"></TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  autoComplete="password"></TextField>
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Box
              sx={{
                ml: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100%',
              }}>
              <Image src={'/images/login.png'} alt="login" width={400} height={400} layout="responsive" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginForm;
