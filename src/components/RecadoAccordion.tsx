import * as React from 'react';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import defaultTheme from '../config/theme/Default';
import { checkBotoes } from '../store/Botoes/BotoesSlice';
import { checkForm } from '../store/Form/FormSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { excluirRecado, removeOne } from '../store/Recados/RecadosSlice';
import { Recado } from '../store/Recados/types';

interface RecadoAccordionProps {
  id: number
  descricao: string;
  detalhamento: string;
  dado: Recado;
}

const style = {
  margin: '5px',
  '&:hover': {
    backgroundColor: defaultTheme.palette.primary.light,
  },
  backgroundColor: defaultTheme.palette.primary.main,
  fontFamily: '"Josefin Sans", sans-serif',
};

const RecadoAccordion: React.FC<RecadoAccordionProps> = ({ id, descricao,detalhamento, dado }) => {
  
  const estadoForm = useAppSelector((state: any) => state.form.aparece.payload);
  const dispatch = useAppDispatch();

  const handleEditar = () => {
    dispatch(checkBotoes(false));
    dispatch(checkForm(!estadoForm));
    localStorage.setItem('idRecado', `${id}`);
    localStorage.setItem('descriRecado', `${descricao}`);
    localStorage.setItem('detRecado', `${detalhamento}`);
  };
  const handleApagar = () => {
    dispatch(excluirRecado(id));
    dispatch(removeOne(id));
  }

  return (
      <Accordion sx={{width: '100%', margin: '5px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{backgroundColor: '#0E4562', color:'white'}}
        >
          <Typography variant="body1" sx={{fontFamily: '"Josefin Sans", sans-serif'}}>{id}# {descricao}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{overflowY: 'auto', marginTop: '5px'}}>
          <Typography variant="body2" sx={{fontFamily: '"Josefin Sans", sans-serif', marginBottom: '20px'}}>
            {detalhamento}
          </Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
          <Button variant="contained" sx={style} onClick={handleEditar}>Editar</Button>
          <Button variant="contained" sx={style} onClick={handleApagar}>Apagar</Button>
          </Box>
         
        </AccordionDetails>
      </Accordion>
  );
};

export default RecadoAccordion;
