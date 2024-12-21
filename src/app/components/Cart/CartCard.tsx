import React, { useEffect, useState } from 'react';

import { Book } from '@/app/models/book';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Card, CardContent, Typography, IconButton, Grid, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

type CartCardProps = {
  book: Book;
  quantity: number;
  handleCheckboxChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedIds: Record<string, boolean>;
};

const CartCard = (props: CartCardProps) => {
  const { book, quantity, handleCheckboxChange, checkedIds } = props;

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Checkbox */}
          <Grid item xs={1}>
            <Checkbox
              checked={checkedIds[book.id.toString()] || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(book.id.toString(), e)}
            />
          </Grid>

          {/* Product Image */}
          <Grid item xs={3}>
            <Box
              component="img"
              src={book?.cover || 'https://via.placeholder.com/100'}
              alt={book?.title || 'Product Image'}
              sx={{ width: '100%', borderRadius: 1 }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={5}>
            <Typography variant="h6">{book?.title || '제목 없음'}</Typography>
            <Typography color="text.secondary">저자: {book?.author || '알 수 없음'}</Typography>
            <Typography>가격: ₩{book?.priceStandard?.toLocaleString() || '0'}</Typography>
          </Grid>

          {/* Quantity and Actions */}
          <Grid item xs={3} textAlign="center">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" alignItems="center">
                <IconButton disabled={quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />}>
                삭제
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartCard;
