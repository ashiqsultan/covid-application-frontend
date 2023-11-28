import MainMap from '../components/MainMap';
import Filters from '../components/Filters';
import { Box } from '@mui/material';
import BarChart from '../components/BarChart';
import OtherInfo from '../components/OtherInfo';

const HomePage: React.FC = () => {
  return (
    <Box marginInline={'1rem'}>
      <Box
        sx={{
          width: '100%',
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
            marginRight: '1rem',
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
      <Box marginTop={'2rem'} marginBottom={'2rem'}>
        <OtherInfo />{' '}
      </Box>
    </Box>
  );
};

export default HomePage;
