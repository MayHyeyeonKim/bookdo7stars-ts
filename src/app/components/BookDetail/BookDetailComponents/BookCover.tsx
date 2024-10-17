import { Paper } from '@mui/material';

interface BookCoverProps {
  cover: string;
}

const BookCover: React.FC<BookCoverProps> = ({ cover }) => {
  return (
    <Paper elevation={3} sx={{ padding: 0, margin: 0 }}>
      <img src={cover} alt="Book Cover" style={{ width: '100%', height: '100%', display: 'block' }} />
    </Paper>
  );
};

export default BookCover;
