'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { registerRequest } from '../actions';
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
  const dispatch = useDispatch<AppDispatch>();
  const { register_message, isRegisterError } = useSelector((store: AppState) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (register_message) {
      console.log('유즈이펙트에서 회원가입 성공:', register_message);
      toast.success(`${register_message}`);
      router.push('/login');
    }
  }, [register_message]);

  useEffect(() => {
    if (isRegisterError) {
      console.log('유즈이펙트에서 회원가입 Error:', isRegisterError);
      const errMessage = typeof isRegisterError === 'object' ? isRegisterError.message : isRegisterError;
      toast.error(`${errMessage}`);
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
      confirmPassword: formData.password !== formData.confirmPassword,
      policyyn: !formData.policyyn,
    };
    setInputErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // formData가 handleOnSubmit 함수 내부에서 사용될 수 있는 이유는, formData가 이 함수의 외부에서 정의된 변수이기 때문입니다. 이와 같은 방식으로 변수를 사용하는 것을 **클로저(Closure)**라고 합니다.
    // 클로저란, 함수가 자신이 정의된 환경(즉, 함수가 생성된 시점의 스코프)에 있는 변수들에 접근할 수 있는 능력을 말합니다. 클로저는 함수와 그 함수가 정의된 환경의 변수를 함께 기억합니다.
    if (handleErrors(formData)) {
      console.log('handleOnSubmit called');
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
