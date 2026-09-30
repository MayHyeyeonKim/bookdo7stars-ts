import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 30vh)',
    }}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
