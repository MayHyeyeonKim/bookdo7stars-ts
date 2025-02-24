'use client';

import { ChangeEvent } from 'react';

import { ShippingInfo } from '@/app/models/order';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Box, Paper, Typography, TextField, Button, useMediaQuery, useTheme } from '@mui/material';

type AddressFormProps = {
  shippingInfo: ShippingInfo;
  handleShippingInfoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePostcode: () => void;
  errors: any;
};

const AddressForm: React.FC<AddressFormProps> = (props: AddressFormProps) => {
  const { shippingInfo, handleShippingInfoChange, handlePostcode, errors } = props;
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={0} sx={{ width: '100%', mt: '6rem' }}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.third?.main || '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-start',
          borderRadius: '5px',
        }}>
        <LocalShippingOutlinedIcon sx={{ fontSize: 40, ml: isMobile ? 0 : 2, mr: isMobile ? 0 : 1, color: theme.palette.primary.main }} />
        {!isMobile && (
          <Typography variant="h5" sx={{ mt: 1.5, mb: 1.5, p: 0, minWidth: '50px', whiteSpace: 'nowrap', color: theme.palette.primary.main }}>
            배송지 정보
          </Typography>
        )}
      </Box>

      <Box mt={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField label="이름" name="name" placeholder="이름" variant="outlined" onChange={handleShippingInfoChange} sx={{ flex: 1 }} />
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="우편번호"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleShippingInfoChange}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
            sx={{ alignItems: 'center' }}
          />
          <Button variant="contained" color="primary" onClick={handlePostcode} sx={{ height: '56px', ml: 2 }}>
            주소찾기
          </Button>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <TextField label="주소" name="address1" placeholder="주소" variant="outlined" onChange={handleShippingInfoChange} sx={{ flex: 1 }} />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField label="상세 주소" name="address2" placeholder="상세 주소" variant="outlined" onChange={handleShippingInfoChange} sx={{ flex: 1 }} />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField label="전화번호" name="phone" placeholder="전화번호" variant="outlined" onChange={handleShippingInfoChange} sx={{ flex: 1 }} />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField label="이메일" name="email" placeholder="email" variant="outlined" onChange={handleShippingInfoChange} sx={{ flex: 1 }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default AddressForm;
