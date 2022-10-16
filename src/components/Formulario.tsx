import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import defaultTheme from "../config/theme/Default";
import { checkBotoes } from "../store/Botoes/BotoesSlice";
import { checkForm } from "../store/Form/FormSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  atualizarRecado,
  criarRecado,
  updateOne,
} from "../store/Recados/RecadosSlice";
import { Recado, RecadoRequest } from "../store/Recados/types";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { limparInfo } from "../store/RecadoBuscado/RecadoBuscado";

const BtnStyled = styled(Button)({
  margin: "5px",
  "&:hover": {
    backgroundColor: defaultTheme.palette.primary.light,
  },
  backgroundColor: defaultTheme.palette.primary.main,
  fontFamily: '"Josefin Sans", sans-serif',
});

const BoxForm = styled(Box)({
  width: "50%",
  padding: "30px",
  margin: "30px",
  boxShadow: "4px -1px 22px 5px #9e9e9e",
  borderRadius: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
});

const RadioGroupStyled = styled(RadioGroup)({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
  margin: "10px",
});

const TextFieldStyled = styled(TextField)({
  margin: "10px",
  fontFamily: '"Josefin Sans", sans-serif',
});

const BoxButtons = styled(Box)({
  margin: "20px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
});

const Formulario: React.FC = () => {
  const [descri, setDescri] = useState("");
  const [status, setStatus] = useState("concluido");
  const [det, setDet] = useState("");
  const estadoForm = useAppSelector((state) => state.form.aparece.payload);
  const recadoBuscado = useAppSelector((state) => state.recadobuscado);
  const estadoBotao = useAppSelector((state) => state.botoes.check.payload);
  const dispatch = useAppDispatch();

  const handleFormulario = () => {
    if (!estadoForm) {
      dispatch(checkForm(false));
    }
    dispatch(checkForm(!estadoForm));
    dispatch(checkBotoes(true));
  };

  const handleCancelFormulario = () => {
    dispatch(checkForm(!estadoForm));
    dispatch(checkBotoes(true));
    setDescri("");
    setDet("");
  };

  function handleSalvar() {
    const novoRecado: RecadoRequest = {
      descricao: descri,
      detalhamento: det,
      status: status,
    };
    console.log(novoRecado);
    dispatch(criarRecado(novoRecado));
    dispatch(checkForm(!estadoForm));
    dispatch(checkBotoes(!estadoBotao));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  function handleEditar() {
    const novoRecado: Recado = {
      id: recadoBuscado.id,
      descricao: descri,
      detalhamento: det,
      status: status,
    };
    console.log("chamou atualizar");
    dispatch(atualizarRecado(novoRecado));
    dispatch(updateOne({ id: recadoBuscado.id, changes: novoRecado }));
    dispatch(checkForm(!estadoForm));
  }

  useEffect(() => {
    if (estadoBotao) {
      setDescri("");
      setDet("");
      limparInfo();
    } else {
      setTimeout(() => {
        setStatus(recadoBuscado.status);
        setDescri(recadoBuscado.descricao);
        setDet(recadoBuscado.detalhamento);
      }, 1000);
    }
  }, [estadoBotao]);

  useEffect(() => {
    dispatch(checkForm(false));
  }, []);

  return (
    <>
      <BtnStyled variant="contained" onClick={handleFormulario}>
        <NoteAddIcon />
      </BtnStyled>
      {estadoForm ? (
        <BoxForm>
          <RadioGroupStyled
            aria-labelledby="demo-radio-buttons-group-label"
            value={status}
            name="radio-buttons-group"
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="concluido"
              control={<Radio />}
              label="Concluido"
            />
            <FormControlLabel
              value="pendente"
              control={<Radio />}
              label="Pendente"
            />
            <FormControlLabel
              value="cancelado"
              control={<Radio />}
              label="Cancelado"
            />
          </RadioGroupStyled>
          <TextFieldStyled
            id="input-descricao"
            fullWidth
            label="Descrição"
            variant="outlined"
            placeholder="Digite aqui..."
            onChange={(e) => setDescri(e.target.value)}
            value={descri}
          />
          <TextFieldStyled
            id="input-detalhamento"
            fullWidth
            label="Detalhamento"
            multiline
            rows={3}
            placeholder="Digite aqui..."
            onChange={(e) => setDet(e.target.value)}
            value={det}
          />

          <BoxButtons>
            {estadoBotao ? (
              <BtnStyled variant="contained" onClick={handleSalvar}>
                <AddCircleIcon />
              </BtnStyled>
            ) : (
              <BtnStyled variant="contained" onClick={handleEditar}>
                <CheckCircleIcon />
              </BtnStyled>
            )}

            <BtnStyled variant="contained" onClick={handleCancelFormulario}>
              <CancelIcon />
            </BtnStyled>
          </BoxButtons>
        </BoxForm>
      ) : (
        <></>
      )}
    </>
  );
};

export default Formulario;
