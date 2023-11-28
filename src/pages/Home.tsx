import MainMap from '../components/MainMap';
import Filters from '../components/Filters';
import { Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '1rem',
      }}
    >
      <Box
        sx={{
          width: '25%',
          height: '100%',
        }}
      >
        <Filters />
      </Box>
      <Box
        sx={{
          width: '75%',
          height: '100%',
        }}
      >
        <MainMap />
      </Box>
    </Box>
  );
};

export default HomePage;
