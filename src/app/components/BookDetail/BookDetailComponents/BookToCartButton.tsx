import React from 'react';
import { Button, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { pink } from '@mui/material/colors';

// Props 타입 정의
interface BookToCartProps {
  book: {
    title: string;
    author: string;
    price: number;
    // 필요에 따라 추가적인 필드를 정의할 수 있습니다.
  };
}

const BookToCart: React.FC<BookToCartProps> = ({ book }) => {
  const handleAddToCart = () => {
    // 카트에 추가하는 로직 구현
  };

  const handleFavoriteClick = () => {
    // 찜하기 기능 구현
  };

  const deleteFavoriteClick = () => {
    // 찜하기 취소 기능 구현
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button onClick={handleAddToCart} variant="contained" color="primary" startIcon={<AddShoppingCartIcon />} sx={{ height: '60px', flexGrow: 1 }}>
        카트에 추가하기
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<FavoriteBorderIcon sx={{ color: pink[500] }} />}
        sx={{ height: '60px', flexGrow: 1 }}
        onClick={handleFavoriteClick}>
        찜하기
      </Button>
    </Box>
  );
};

export default BookToCart;
