import { ThemeProvider } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import StylesGlobal from './config/GlobalStyles';
import defaultTheme from './config/theme/Default';
import Home from './pages/Home/Home';
import AppRoutes from './routes/AppRoutes';
import { store } from './store';
import './index.css'

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <StylesGlobal/>
      <AppRoutes/>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
