import { useState } from 'react';

import { Box, Container, Grid } from '@mui/material';

import BookBasicInfo from './BookDetailComponents/BookBasicInfo';
import BookCover from './BookDetailComponents/BookCover';
import BookToCartButton from './BookDetailComponents/BookToCartButton';
import AddressChange from '../../../utils/AddressChange';
import DeliveryEstimate from '../../../utils/DeliveryEstimate';
import { Book } from '../../models/book';
// 타입을 명시적으로 지정 (예시)
interface BookOverviewProps {
  book: Book | null;
}

const BookOverview: React.FC<BookOverviewProps> = ({ book }) => {
  const [address, setAddress] = useState('Select your region');
  const [quantity, setQuantity] = useState<number>(1);
  if (!book) {
    return <p>책 정보를 읽어오지 못했습니다.</p>;
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  console.log('quantity는? ', quantity);

  return (
    <Box data-testid="book-overview-box" sx={{ mt: { xs: 8, md: 16 } }}>
      <Container sx={{ mb: 4 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <BookCover cover={book.cover} />
          </Grid>
          <Grid item xs={12} md={8}>
            <BookBasicInfo
              title={book.title}
              author={book.author}
              publisher={book.publisher}
              priceStandard={book.priceStandard}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
            />
            <BookToCartButton book={book} quantity={quantity} />
            <Box mt={3}>
              <Box
                component="div"
                display="flex"
                alignItems="center"
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  padding: '8px',
                  borderRadius: '4px',
                }}>
                <div style={{ marginRight: '14px' }}>배송 정보 </div>
                <h6 style={{ margin: 0, marginRight: '13px' }}>{address}</h6>
                <AddressChange setAddress={setAddress} />
              </Box>
              <DeliveryEstimate address={address} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookOverview;
