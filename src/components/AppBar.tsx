import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function MainAppBar() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            variant='h4'
            sx={{ flexGrow: 1, textAlign: 'center' }}
            onClick={() => navigate('/')}
          >
            Covid Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
