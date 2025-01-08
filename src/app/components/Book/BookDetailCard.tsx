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
import ActionButtons from '../Buttons/ActionButtons';

interface BookDetailCardProps {
  book: Book;
}

const StyledCard = styled(Card)`
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

const BookDetailCard: React.FC<BookDetailCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [address, setAddress] = useState('Select your region');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const clickBookCard = (book: Book) => {
    setLoading(true);
    router.push(`/book/${book.id}`);
  };

  const actionButtonNames = ['장바구니', '바로구매', '보관함'];
  const buttonIcons = {
    장바구니: { component: <ShoppingCartIcon />, style: { color: 'inherit', marginRight: 0.5 } },
    바로구매: { component: <PaymentIcon />, style: { color: 'primary', marginRight: 0.5 } },
    보관함: { component: <FavoriteBorderIcon />, style: { color: pink[500], marginRight: 0.5 } },
  };

  const handleOnClick = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    console.log('보관함에 추가', name);
  };

  const buttonStyle = { width: '120px', height: '50px', display: 'flex', alignItems: 'center' };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card
          sx={{
            cursor: 'pointer',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'visible',
            borderRadius: '12px',
            boxShadow: 3,
            display: 'flex',
            width: '100%',
            maxWidth: 800,
            height: 300,
            padding: 0,
          }}
          onClick={() => clickBookCard(book)}>
          <CardMedia
            component="img"
            image={book.cover}
            alt={book.title}
            sx={{
              width: { xs: '100%', md: '220px' },
              height: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px',
            }}
          />
          <CardContent
            sx={{
              width: '70%',
              height: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              padding: { xs: '16px', md: '24px' }, // 화면 크기에 따라 패딩 조정
              justifyContent: 'space-between',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '70%',
                maxWidth: '340px',
                height: '100%',
              }}
              className="card-content-info">
              <Box
                className="book-title"
                sx={{
                  flexShrink: 0, // 부모 크기에 따라 축소되지 않음
                }}>
                <Typography
                  variant="h6"
                  onClick={() => clickBookCard(book)}
                  sx={{ cursor: 'pointer', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                  {book.title.split('-')[0].trim()}
                </Typography>
              </Box>
              <Box className="book-author-publisher" sx={{ flexShrink: 0, width: '100%', overflow: 'hidden' }}>
                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                  {book.author} | {book.publisher} | {new Date(book.pubDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box
                className="book-price-info"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap', // 화면 크기에 따라 줄바꿈 가능
                  gap: 1, // 요소 간 간격
                  mt: 1,
                }}>
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  <span style={{ color: 'black' }}>{currencyFormat(book.priceStandard)}원 →</span>

                  <span style={{ color: pink[500], fontWeight: 'bold', fontSize: '18px' }}> {currencyFormat(book.priceSales)}원</span>

                  <span style={{ marginLeft: '0.5rem', color: pink[500], fontSize: '14px' }}>
                    ({(((book.priceStandard - book.priceSales) / book.priceStandard) * 100).toFixed(2)}% 할인
                  </span>

                  <span style={{ color: pink[500], fontSize: '14px' }}> {book.mileage}p 적립)</span>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}></Box>

              <Typography variant="caption" color="text.secondary">
                세일즈포인트: {currencyFormat(book.salesPoint)}
              </Typography>
              <Box
                className="region-select-box"
                component="div"
                display={{ xs: 'none', md: 'flex' }}
                alignItems="center"
                sx={{
                  backgroundColor: `${theme.palette.third.main}`,
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  position: 'relative',
                  flexWrap: 'wrap',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  flexDirection: 'row',
                  gap: '0.25rem',
                  padding: '0.5rem 0.25rem 0.5rem 0.25rem',
                  overflow: 'visible',
                }}
                onClick={(event) => event.stopPropagation()}>
                <Box sx={{ display: 'flex', gap: 5 }}>
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>배송 정보</Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{address}</Typography>
                </Box>

                <Box className="address-change-box">
                  <AddressChange setAddress={setAddress} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: { xs: 'row', md: 'column' },
                width: '30%',
                height: '100%',
              }}>
              <ActionButtons names={actionButtonNames} handleOnClick={() => handleOnClick} icons={buttonIcons} style={buttonStyle} />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookDetailCard;
