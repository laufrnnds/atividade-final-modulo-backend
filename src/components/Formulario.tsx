import { Box } from '@mui/material';
import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import defaultTheme from '../config/theme/Default';
import { checkBotoes } from '../store/Botoes/BotoesSlice';
import { checkForm } from '../store/Form/FormSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { atualizarRecado, criarRecado, selectAll, selectById, updateOne } from '../store/Recados/RecadosSlice';
import { Recado, RecadoRequest } from '../store/Recados/types';

const style = {
  margin: '5px',
  '&:hover': {
    backgroundColor: defaultTheme.palette.primary.light,
  },
  backgroundColor: defaultTheme.palette.primary.main,
  fontFamily: '"Josefin Sans", sans-serif',
};

const Formulario: React.FC = () => {

  const [descri, setDescri] = useState("");
  const [det, setDet] = useState("");
  const [idRecado, setIdRecado] = useState(0);
  const recado = useAppSelector((state) => selectById(state, idRecado));
  const estadoForm = useAppSelector((state) => state.form.aparece.payload);
  const estadoBotao = useAppSelector((state) => state.botoes.check.payload);
  let txtdescri = '';
  let txtdet =  '';
  const dispatch = useAppDispatch();
  const listaRecados = useAppSelector(selectAll);

  const handleFormulario = () => {
      dispatch(checkForm(!estadoForm));
      dispatch(checkBotoes(true));
  };

  const handleCancelFormulario = () => {
    dispatch(checkForm(!estadoForm));
    setDescri('');
    setDet('');
};

function handleSalvar(){
  const novoRecado: RecadoRequest = {
    descricao: descri,
    detalhamento: det,
  }
  dispatch(criarRecado(novoRecado))
  window.location.reload()
  dispatch(checkBotoes(!estadoBotao));
}

function handleEditar(){
  const novoRecado: Recado = {
    id: idRecado,
    descricao: descri,
    detalhamento: det,
  }
  console.log("chamou atualizar")
  dispatch(atualizarRecado(novoRecado));
  dispatch(updateOne( {id: idRecado, changes: novoRecado}))
  dispatch(checkForm(!estadoForm));
}

  useEffect(() => {
    if (estadoBotao) {
      setDescri('');
      setDet('');
    }
    else{
        txtdescri = localStorage.getItem('descriRecado') || '';
        txtdet = localStorage.getItem('detRecado') || '';
  
        setDescri(txtdescri);
        setDet(txtdet);
    }
    
  }, [estadoBotao]);

  useEffect(() => {
    dispatch(checkForm(false));
    setIdRecado(Number(localStorage.getItem('idRecado')));
  }, [])



  return (
    <>
    <Button variant="contained" sx={style} onClick={handleFormulario}>Novo Recado</Button>
    {
      estadoForm ? (
        <Box
        component="form"
        sx={{
          width:'50%',padding: '20px', margin: '30px', boxShadow: '4px -1px 22px 5px #9e9e9e', borderRadius: '25px',display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="input-descricao" fullWidth label="Descrição" variant="outlined" placeholder="Digite aqui..." onChange={(e) => setDescri(e.target.value)} value={descri} sx={{margin: '10px', fontFamily: '"Josefin Sans", sans-serif'}}/>
        <TextField
            id="input-detalhamento"
            fullWidth
            label="Detalhamento"
            multiline
            rows={3}
            placeholder="Digite aqui..."
            onChange={(e) => setDet(e.target.value)}
            value={det}
            sx={{margin: '10px', fontFamily: '"Josefin Sans", sans-serif'}}
          />
      
      {
        estadoBotao ? (<Button variant="contained" sx={style} onClick={handleSalvar}>Salvar</Button>)
        :(<Button variant="contained" sx={style} onClick={handleEditar}>Atualizar</Button>)
      }
    
        <Button variant="contained" sx={{style}} onClick={handleCancelFormulario}>Cancelar</Button>

      </Box>
      ):(<></>)
      
    }
    </>
  );
};

export default Formulario;
