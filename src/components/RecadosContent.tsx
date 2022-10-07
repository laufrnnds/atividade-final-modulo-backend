import React from 'react';
import RecadoAccordion from './RecadoAccordion';
import { Box } from '@mui/material';
import { Recado } from '../store/Recados/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAll } from '../store/Recados/RecadosSlice';

const RecadosContent: React.FC = () => {

  const listaRecados = useAppSelector(selectAll);

  return (
    <Box sx={{width: '70%', margin: "30px"}}>
      {listaRecados.map((recado: Recado) => {
       return <RecadoAccordion key={recado.id} id={recado.id} descricao={recado.descricao} detalhamento={recado.detalhamento} dado={recado}/>
      })}
    </Box>
  );
};

export default RecadosContent;