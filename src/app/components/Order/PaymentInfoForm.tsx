'use client';

import React, { ChangeEvent } from 'react';

import { CardInfo } from '@/app/models/order';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import {
  Paper,
  Typography,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';

type PaymentInfoFormProps = {
  paymentMethod: string;
  errors: any;
  handleCardInfoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCardTypeChange: (e: SelectChangeEvent) => void;
  handlePaymentMethodChange: (e: SelectChangeEvent) => void;
  cardInfo: CardInfo;
};

const PaymentInfoForm: React.FC<PaymentInfoFormProps> = (props: PaymentInfoFormProps) => {
  const { paymentMethod, handlePaymentMethodChange, errors, handleCardInfoChange, handleCardTypeChange, cardInfo } = props;
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
        <PaymentOutlinedIcon sx={{ fontSize: 40, ml: isMobile ? 0 : 2, mr: isMobile ? 0 : 1, color: theme.palette.primary.main }} />
        {!isMobile && (
          <Typography variant="h5" sx={{ mt: 1.5, mb: 1.5, p: 0, minWidth: '50px', whiteSpace: 'nowrap', color: theme.palette.primary.main }}>
            결제 정보
          </Typography>
        )}
      </Box>

      <FormControl component="fieldset" fullWidth margin="normal">
        <RadioGroup row value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="creditCard" control={<Radio />} label="신용카드" />
          <FormControlLabel value="transfer" control={<Radio />} label="무통장 입금" />
          <FormControlLabel value="phonePayment" control={<Radio />} label="휴대폰 결제" />
        </RadioGroup>
      </FormControl>
      {paymentMethod === 'creditCard' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>카드사 선택</InputLabel>
            <Select name="cardType" value={cardInfo.cardType} onChange={handleCardTypeChange} error={!!errors.cardType}>
              <MenuItem value="visa">Visa</MenuItem>
              <MenuItem value="mastercard">MasterCard</MenuItem>
              <MenuItem value="amex">American Express</MenuItem>
            </Select>
            <FormHelperText>{errors.cardType}</FormHelperText>
          </FormControl>
          <TextField
            fullWidth
            label="카드 번호"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleCardInfoChange}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
          />
          <TextField
            fullWidth
            label="유효 기간 (MM/YY)"
            name="expiryDate"
            value={cardInfo.expiryDate}
            onChange={handleCardInfoChange}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
          />
          <TextField fullWidth label="CVC" name="cvc" value={cardInfo.cvc} onChange={handleCardInfoChange} error={!!errors.cvc} helperText={errors.cvc} />
        </Box>
      )}
    </Paper>
  );
};

export default PaymentInfoForm;
