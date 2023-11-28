import { useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppContext } from '../context/AppContext';

export default function Filters() {
  const { state, setCategory, setSelectedCountry } = useContext(AppContext);
  const worldData = state.worldData;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id='select-category'>Category</InputLabel>
        <Select
          labelId='select-category'
          value={state.category}
          label='Category'
          onChange={(event) => {
            setCategory(event.target.value as string);
          }}
        >
          <MenuItem value={'death'}>Death</MenuItem>
          <MenuItem value={'confirmed'}>Confirmed</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='select-country'>Country</InputLabel>
        <Select
          labelId='select-country'
          value={state.selectedCountry}
          label='Country'
          onChange={(event) => {
            setSelectedCountry(event.target.value as string);
          }}
        >
          {worldData.map((item) => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
