import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Formulario from '../../components/Formulario';
import Header from '../../components/Header';
import RecadosContent from '../../components/RecadosContent';
import { useAppDispatch } from '../../store/hooks';
import { buscarRecados } from '../../store/Recados/RecadosSlice';


const Home: React.FC = () => {
  const dispatch = useAppDispatch();


  useEffect(()=>{
    dispatch(buscarRecados());
  },[]);

  return (
    <Box sx={{ width: "100vw", height: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', overflowX: 'hidden'}}>
      <Header/>
      <Typography variant='h3' align='center' sx={{fontFamily: '"Josefin Sans", sans-serif', margin: '20px'}}>Recados</Typography>
      <Formulario/>
      <RecadosContent/>
    </Box>
  );
};

export default Home;
