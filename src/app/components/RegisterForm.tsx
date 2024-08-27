'use client';
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';

import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { registerRequest } from '../actions/constants';
import { AppDispatch, AppState } from '../store/store';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  mobile: string;
  policyyn: boolean;
};

const RegisterForm = () => {
  const toastDisplayed = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const { registerMessage, isRegisterError } = useSelector((store: AppState) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (registerMessage && !toastDisplayed.current) {
      toast.success(`${registerMessage}`);
      router.push('/login');
      toastDisplayed.current = true;
    }
  }, [registerMessage]);

  useEffect(() => {
    if (isRegisterError) {
      toast.error(isRegisterError);
    }
  }, [isRegisterError]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobile: '',
    policyyn: false,
  });

  const [inputErrors, setInputErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    policyyn: false,
  });

  const [checkConfirmPasswordError, setCheckConfirmPasswordError] = useState(false);

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setCheckConfirmPasswordError(formData.password !== formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const targetName = event.target.name;
    const targetValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    setFormData({ ...formData, [targetName]: targetValue });
  };

  const handleErrors = (formData: FormData) => {
    const errors = {
      email: !formData.email,
      name: !formData.name,
      password: !formData.password,
      confirmPassword: !formData.confirmPassword,
      policyyn: !formData.policyyn,
    };
    setInputErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleErrors(formData)) {
      dispatch(
        registerRequest({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          mobile: formData.mobile,
        }),
      );

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        mobile: '',
        policyyn: false,
      });
    }
  };

  const renderMandatoryFieldErrorMessage = (key: string, error: boolean): string => {
    if (error) {
      if (key === 'policyyn') {
        return 'You should agree the Policy.';
      } else {
        return 'This is a mandatory field.';
      }
    }
    return '';
  };

  const confirmPasswordErrorMessage = 'Password does not match!';

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box sx={{ mr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
              <Image src={'/images/register.png'} alt="register" width={400} height={400} />
            </Box>
          </Grid>
          <Grid item xs>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2, p: 4, ml: 2, width: '100%' }}>
              <Typography component="h1" variant="h5" gutterBottom>
                Register
              </Typography>
              <Box component="form" onSubmit={handleOnSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  autoComplete="name"
                  error={inputErrors.name}
                  helperText={inputErrors.name ? `${renderMandatoryFieldErrorMessage('name', inputErrors.name)}` : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  autoComplete="email"
                  error={inputErrors.email}
                  helperText={inputErrors.email ? `${renderMandatoryFieldErrorMessage('email', inputErrors.email)}` : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  error={inputErrors.password}
                  helperText={inputErrors.password ? `${renderMandatoryFieldErrorMessage('password', inputErrors.password)}` : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="confirmPassword"
                  label="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleOnChange}
                  type="password"
                  error={inputErrors.confirmPassword}
                  helperText={inputErrors.password ? `${renderMandatoryFieldErrorMessage('password', inputErrors.password)}` : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {checkConfirmPasswordError && <span style={{ fontSize: '0.8rem', color: 'red', marginTop: -5 }}>{confirmPasswordErrorMessage}</span>}
                <TextField
                  margin="normal"
                  fullWidth
                  id="address"
                  label="address"
                  name="address"
                  value={formData.address}
                  onChange={handleOnChange}
                  autoComplete="address"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="mobile"
                  label="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleOnChange}
                  autoComplete="mobile"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel
                  control={<Checkbox name="policyyn" checked={formData.policyyn} onChange={handleOnChange} color="primary" />}
                  label="I agree to the terms and conditions."
                />
                {inputErrors.policyyn && (
                  <p style={{ fontSize: '0.8rem', color: 'red', marginTop: -5 }}>{renderMandatoryFieldErrorMessage('policyyn', inputErrors.policyyn)}</p>
                )}
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                  Register
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterForm;
