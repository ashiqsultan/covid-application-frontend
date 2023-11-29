import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Box } from '@mui/material';
import FallbackBox from './FallbackBox';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BarChart: React.FC = () => {
  const { state } = useContext(AppContext);
  const countryInfo = state.countryInfo;
  const [chartData, setChartData] = React.useState<any>();
  React.useEffect(() => {
    if (!countryInfo) return;
    setChartData({
      labels: ['Deaths', 'Recovered', 'Active'],
      datasets: [
        {
          data: [countryInfo.deaths, countryInfo.recovered, countryInfo.active],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)', // Deaths
            'rgba(75, 192, 192, 0.5)', // Recovered
            'rgba(255, 206, 86, 0.5)', // Active
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [countryInfo]);

  if (!countryInfo || !chartData) {
    return (
      <FallbackBox text='Select a country from map or dropdown to view charts' />
    );
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxHeight: '50vh',
        marginTop: '2rem',
      }}
    >
      <Bar options={options} data={chartData} />
    </Box>
  );
};
export default BarChart;
