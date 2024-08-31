import { Book } from '@/app/models/book';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';

import { currencyFormat } from '../../../utils/helpers';
interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div>
      <Card
        sx={{
          width: 230,
          height: 370,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.00)',
            boxShadow: 6,
          },
        }}>
        <CardMedia
          component="img"
          image={book.cover}
          alt={book.title}
          sx={{ height: 275, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, cursor: 'poiner' }}
        />
        <CardContent sx={{ height: 95, width: '100%', padding: '8px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              {book.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              {book.author}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <Typography variant="body2" color="text.primary">
                ₩ {currencyFormat(book.priceStandard)}
              </Typography>
              <Box>
                {/* favorite이 있으면 : 없으면 삼항연산자 넣어서 처리 */}
                <IconButton sx={{ padding: '5px' }}>
                  <FavoriteBorderIcon fontSize="small" sx={{ color: pink[500] }} />
                </IconButton>
                <IconButton sx={{ padding: '5px' }}>
                  <ShoppingCartIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
export default BookCard;
