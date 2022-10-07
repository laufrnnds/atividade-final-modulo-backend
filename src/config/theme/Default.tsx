import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#7A517D',
      main: '#4E2051',
    },
    secondary: {
      light: '#437791',
      main: '#0E4562',
    },
    error: {
      light: '#F59FC6',
      main: '#C07496',
    },
  },
});

export default defaultTheme;