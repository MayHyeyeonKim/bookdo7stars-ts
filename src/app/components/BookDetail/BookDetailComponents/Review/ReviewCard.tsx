import { Review } from '@/app/models/review';
import { User } from '@/app/models/user';
import { RootState } from '@/app/reducers';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Card, Typography, Container, IconButton, TextField } from '@mui/material';

type ReviewCardProps = {
  user: User | null;
  review: Review;
  editedReviewContent: string;
  handleEditReview: (reviewId: string) => void;
  handleDeleteReview: (reviewId: string) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClick: (reviewId?: string) => void;
  handleOnClickCancel: (reviewId: string) => void;
  isEditing: Record<string, boolean>;
};
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      marginRight: '1rem',
    },
    children: name.split(' ').length > 1 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
  };
}

const ReviewCard = (props: ReviewCardProps) => {
  const { user, review, editedReviewContent, handleEditReview, handleDeleteReview, isEditing, handleOnChange, handleOnClick, handleOnClickCancel } = props;
  const date = review.createdAt === review.updatedAt ? review.createdAt : review.updatedAt;
  const isUpdated = review.createdAt !== review.updatedAt;
  return (
    <Container>
      <Card
        sx={{
          marginBottom: '1rem',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%' }}>
          <Avatar alt={review.user.name} {...stringAvatar(`${review.user.name}`)} />
          {!isEditing[review.id] ? (
            <>
              <Typography variant="body1" sx={{ width: '90%' }}>
                {review.content}
              </Typography>
              {isUpdated && <span style={{ marginLeft: '0.5rem', color: 'gray', fontSize: '14px', width: '10%' }}>(수정됨)</span>}
            </>
          ) : (
            <Box className="review-edit-box" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <TextField id="standard-multiline-static" multiline rows={1} value={editedReviewContent} onChange={handleOnChange} fullWidth variant="outlined" />
            </Box>
          )}
        </Box>

        {user && user.id === review.user.id ? (
          !isEditing[review.id] ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
              <IconButton aria-label="edit" color="primary" onClick={() => handleEditReview(review.id)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" color="primary" sx={{ marginRight: '1rem' }} onClick={() => handleDeleteReview(review.id)}>
                <DeleteIcon />
              </IconButton>
              <Typography>{date.toLocaleString().slice(0, 10)}</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <IconButton
                aria-label="edit-ok"
                color="primary"
                onClick={() => handleOnClick(review.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOnClick(review.id);
                  }
                }}>
                <CheckIcon />
              </IconButton>
              <IconButton aria-label="edit-ok" color="primary" onClick={() => handleOnClickCancel(review.id)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: '6.5rem' }}>
            <Typography>{date.toLocaleString().slice(0, 10)}</Typography>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default ReviewCard;
