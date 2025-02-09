'use client';
import { Box, Button, Container, TextField } from '@mui/material';

type ReviewProps = {
  handleOnClick: () => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  review: string;
};
const Review = (props: ReviewProps) => {
  const { handleOnClick, handleOnChange, review } = props;

  return (
    <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextField id="standard-multiline-static" multiline rows={4} value={review} onChange={handleOnChange} fullWidth />
      <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleOnClick}>
          POST
        </Button>
      </Box>
    </Container>
  );
};

export default Review;
