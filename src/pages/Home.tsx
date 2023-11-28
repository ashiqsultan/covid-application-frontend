import MainMap from '../components/MainMap';
import Filters from '../components/Filters';
import { Box } from '@mui/material';
import BarChart from '../components/BarChart';

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
          height: '75vh',
          paddingInline: '1rem',
        }}
      >
        <Filters />
        <BarChart />
      </Box>
      <Box
        sx={{
          width: '75%',
          height: '75vh',
        }}
      >
        <MainMap />
      </Box>
    </Box>
  );
};

export default HomePage;
