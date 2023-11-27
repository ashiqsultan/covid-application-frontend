import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import NotFoundPage from './pages/404';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <Router>
      <AppProvider>
        <AppBar />
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
