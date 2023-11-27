import { Box, Typography } from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4rem',
      }}
    >
      <Typography variant='h4'>404 Page Not Found</Typography>
    </Box>
  );
};

export default NotFoundPage;
