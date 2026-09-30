import { useState } from 'react';

import { toggleWishlistRequest } from '@/app/actions/types';
import { Book } from '@/app/models/book';
import { CartItemDto } from '@/app/models/cart';
import { RootState } from '@/app/reducers';
import { addToCart } from '@/utils/cartUtils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import AddressChange from '../../../utils/AddressChange';
import { currencyFormat } from '../../../utils/helpers';
import ActionButtons from '../Buttons/ActionButtons';

interface BookDetailCardProps {
  book: Book;
}

const BookDetailCard: React.FC<BookDetailCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((store: RootState) => store.user);
  const { isAddToCartDone } = useSelector((store: RootState) => store.cart);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(book.isBookmarked);
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
    보관함: { component: isBookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon />, style: { color: pink[500], marginRight: 0.5 } },
  };

  const handleOnClick = (name: string) => {
    switch (name) {
      case '장바구니': {
        const cartItem: CartItemDto[] = [{ bookId: book.id, quantity: 1 }];
        const books: Book[] = [book];
        if (user) {
          addToCart(cartItem, books, dispatch, isAddToCartDone, user);
        } else {
          addToCart(cartItem, books, dispatch, isAddToCartDone);
        }
        break;
      }
      case '보관함': {
        dispatch(toggleWishlistRequest([book.id]));
        setIsBookmarked(!isBookmarked);
        break;
      }
    }
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
          }}>
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
            onClick={() => clickBookCard(book)}
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
              <ActionButtons names={actionButtonNames} handleOnClick={handleOnClick} icons={buttonIcons} style={buttonStyle} />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookDetailCard;
