import { Box, Typography } from '@mui/material';
import InfoCard from './InfoCard';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import FallbackBox from './FallbackBox';

const OtherInfo = () => {
  const { state } = useContext(AppContext);
  const { countryInfo } = state;
  if (!countryInfo || Object.keys(countryInfo).length === 0) {
    return (
      <FallbackBox text={'Select a country to view country specific data'} />
    );
  }
  return (
    <Box display={'flex'} flexDirection={'column'} rowGap={'1rem'}>
      <Typography variant='h5' sx={{ textAlign: 'center' }}>
        Information about {countryInfo.name}
      </Typography>
      <Typography variant='h6' sx={{ paddingLeft: '1rem' }}>
        Total Cases
      </Typography>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        columnGap={'1rem'}
        rowGap={'1rem'}
      >
        <InfoCard number={countryInfo.confirmed} description={'Confirmed'} />
        <InfoCard number={countryInfo.deaths} description={'Deaths'} />
        <InfoCard number={countryInfo.recovered} description={'Recovered'} />
        <InfoCard number={countryInfo.active} description={'Active'} />
      </Box>
      {/* New Cases */}
      <Typography variant='h6' sx={{ paddingLeft: '1rem' }}>
        New Cases
      </Typography>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        columnGap={'1rem'}
        rowGap={'1rem'}
      >
        <InfoCard number={countryInfo.new_cases} description={'New Cases'} />
        <InfoCard number={countryInfo.new_deaths} description={'New Deaths'} />
        <InfoCard
          number={countryInfo.new_recovered}
          description={'New Recovered'}
        />
      </Box>
      {/* Per 100 cases*/}
      <Typography variant='h6' sx={{ paddingLeft: '1rem' }}>
        {' '}
        {`Per 100 cases (%)`}
      </Typography>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        columnGap={'1rem'}
        rowGap={'1rem'}
      >
        <InfoCard
          number={countryInfo.deaths_per_100_cases}
          description={'Deaths per 100 Cases'}
        />
        <InfoCard
          number={countryInfo.recovered_per_100_cases}
          description={'Recovered per 100 Cases'}
        />
        <InfoCard
          number={countryInfo.deaths_per_100_recovered}
          description={'Deaths per 100 Recovered'}
        />
      </Box>
      {/* Weekly cases */}
      <Typography variant='h6' sx={{ paddingLeft: '1rem' }}>
        Weekly Cases
      </Typography>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        columnGap={'1rem'}
        rowGap={'1rem'}
      >
        <InfoCard
          number={countryInfo.confirmed_last_week}
          description={'Confirmed Last Week'}
        />
        <InfoCard
          number={countryInfo.one_week_change}
          description={'One Week Change'}
        />
        <InfoCard
          number={countryInfo.one_week_percent_increase}
          description={'One Week Increase %'}
        />
      </Box>
    </Box>
  );
};
export default OtherInfo;
