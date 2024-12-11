import React from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Box } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

// Props 타입 정의

interface Book {
  title: string;
  author: string;
  priceStandard: number;
  cover: string;
  publisher: string;
}

interface BookToCartButtonProps {
  book: Book;
  quantity: number;
}

const BookToCartButton: React.FC<BookToCartButtonProps> = ({ book, quantity }) => {
  const router = useRouter();
  const handleAddToCart = () => {
    // 카트에 추가하는 로직 구현
    const cartItem = { ...book, quantity };
    console.log('카트에 추가:', cartItem);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    router.push(`/cart`);
  };

  const handleFavoriteClick = () => {
    // 찜하기 기능 구현
    console.log('찜하기: ', book.title);
  };

  const deleteFavoriteClick = () => {
    // 찜하기 취소 기능 구현
    console.log('찜하기 취소: ', book.title);
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

export default BookToCartButton;
