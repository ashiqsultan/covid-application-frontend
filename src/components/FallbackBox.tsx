import { Box, Typography } from '@mui/material';

const FallbackBox: React.FC<{ text: string }> = (props) => {
  return (
    <Box
      sx={{
        marginTop: '1rem',
        border: '2px dashed grey',
        borderRadius: '10px',
      }}
    >
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem',
          color: 'grey',
          padding: '1rem',
        }}
      >
        {props.text}
      </Typography>
    </Box>
  );
};
export default FallbackBox;
