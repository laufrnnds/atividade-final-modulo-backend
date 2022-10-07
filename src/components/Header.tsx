import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import { AppBar } from '@mui/material';
import React from 'react';
import defaultTheme from '../config/theme/Default';

const Header: React.FC = () => {
  return (
<AppBar position="static" sx={{backgroundColor: defaultTheme.palette.secondary.light}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant='h5' sx={{fontFamily: '"Josefin Sans", sans-serif'}}>
            Trabalho Final Módulo Back-End - LAURA FERNANDES
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
