import { useState } from 'react';

import { Book } from '@/app/models/book';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import AddressChange from '../../../utils/AddressChange';
import { currencyFormat } from '../../../utils/helpers';

interface SearchResultBookCardProps {
  book: Book;
}

const StyledCard = styled(Card)`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 12px;
  box-shadow: 3;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: scale(1.009);
    box-shadow: 6;
  }
  /* 모바일에서만 max-width 적용 */
  @media (max-width: 900px) {
    max-width: 440px;
  }
`;

const SearchResultBookCard: React.FC<SearchResultBookCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [address, setAddress] = useState('Select your region');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const clickBookCard = (book: Book) => {
    setLoading(true);
    router.push(`/book/${book.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('장바구니에 추가');
  };

  const handleAddToBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('바로구매');
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('보관함에 추가');
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <StyledCard
          sx={{
            cursor: 'pointer',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            overflow: 'visible',
          }}
          onClick={() => clickBookCard(book)}>
          <CardMedia
            component="img"
            image={book.cover}
            alt={book.title}
            sx={{
              borderTopLeftRadius: { md: '12px' },
              borderBottomLeftRadius: { md: '12px' },
              paddingTop: { xs: '30px', md: '0px' },
              width: 240,
              height: 380,
              objectFit: 'cover',
            }}
          />
          <CardContent sx={{ paddingTop: '70px', paddingLeft: '30px', height: { sx: '300px', md: '380px' }, width: '100%' }}>
            <Typography variant="h6" component="div" onClick={() => clickBookCard(book)} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {book.author} | {book.publisher} | {new Date(book.pubDate).toLocaleDateString()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="subtitle2" color="text.primary">
                {currencyFormat(book.priceStandard)}원 →
                <Box component="span" sx={{ color: pink[500], fontWeight: 'bold', fontSize: '20px' }}>
                  {currencyFormat(book.priceSales)}원
                </Box>
                (
                <Box component="span" sx={{ color: pink[500] }}>
                  10%
                </Box>
                할인), 마일리지{' '}
                <Box component="span" sx={{ color: pink[500] }}>
                  {book.mileage}
                </Box>
                원 (
                <Box component="span" sx={{ color: pink[500] }}>
                  5%
                </Box>
                적립)
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              세일즈포인트: {currencyFormat(book.salesPoint)}
            </Typography>

            <Box
              component="div"
              display={{ xs: 'none', md: 'flex' }}
              alignItems="center"
              sx={{
                backgroundColor: `${theme.palette.third.main}`,
                padding: '8px',
                paddingRight: '70px',
                marginTop: '47px',
                fontWeight: 'bold',
                borderRadius: '4px',
                position: 'relative',
                flexWrap: 'nowrap',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                flexDirection: 'row',
                gap: '14px',
                zIndex: 100,
              }}
              onClick={(event) => event.stopPropagation()}>
              <div style={{ marginRight: '14px' }}>배송 정보</div>
              <h6 style={{ margin: 0, marginRight: '13px' }}>{address}</h6>
              <Box sx={{ top: '100%', left: 0, zIndex: 100 }}>
                <AddressChange setAddress={setAddress} />
              </Box>
            </Box>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: { xs: '30px', md: '0px' },
              padding: '12px',
              paddingRight: { xs: '12px', md: '50px' },
              justifyContent: 'space-around',
              gap: '30px',
              flexDirection: { xs: 'row', md: 'column' },
              width: '100%',
            }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '110px', height: '50px', display: 'flex', alignItems: 'center' }}
              onClick={handleAddToCart}>
              <ShoppingCartIcon sx={{ color: 'inherit', marginRight: 0.5 }} />
              장바구니
            </Button>

            <Button sx={{ border: `2px solid ${theme.palette.primary.main}`, width: '110px', height: '50px' }} onClick={handleAddToBuy}>
              <PaymentIcon sx={{ color: 'primary', marginRight: 0.5 }} />
              바로구매
            </Button>

            <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default' }}>
              <Button
                variant="contained"
                disabled
                sx={{
                  width: '110px',
                  height: '50px',
                }}>
                <FavoriteBorderIcon sx={{ color: pink[500], marginRight: 0.5 }} />
                보관함
              </Button>
            </div>
          </Box>
        </StyledCard>
      )}
    </>
  );
};

export default SearchResultBookCard;
