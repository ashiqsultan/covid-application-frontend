import { useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AppContext } from '../context/AppContext';

export default function Filters() {
  const { state, dispatch } = useContext(AppContext);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({
      type: 'SET_CATEGORY',
      // @ts-ignore
      payload: event.target.value,
    });
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id='select-category'>Category</InputLabel>
        <Select
          labelId='select-category'
          value={state.category}
          label='Category'
          onChange={handleChange}
        >
          <MenuItem value={'death'}>Death</MenuItem>
          <MenuItem value={'confirmed'}>Confirmed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
