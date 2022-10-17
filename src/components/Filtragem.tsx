import {
  Button,
  FormControlLabel,
  Typography,
  Radio,
  RadioGroup,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import defaultTheme from "../config/theme/Default";
import { checkFiltro, selectFiltro } from "../store/Filtrar/FiltrarSlice";
import { checkForm } from "../store/Form/FormSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { buscarRecados, filtrarRecados } from "../store/Recados/RecadosSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import CancelIcon from "@mui/icons-material/Cancel";
import ButtonStyled from "./ButtonStyled";
import { checkMostrar } from "../store/Mostrar/MostrarSlice";

const BoxForm = styled(Box)({
  width: "50%",
  padding: "20px",
  margin: "30px",
  boxShadow: "4px -1px 22px 5px #9e9e9e",
  borderRadius: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
});

const BoxItens = styled(Box)({
  width: "100%",
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

const BoxButtons = styled(Box)({
  width: "100%",
  margin: "20px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
});

const BtnStyled = styled(Button)({
  margin: "5px",
  "&:hover": {
    backgroundColor: defaultTheme.palette.primary.light,
  },
  backgroundColor: defaultTheme.palette.primary.main,
  fontFamily: '"Josefin Sans", sans-serif',
});

const Filtragem: React.FC = () => {
  const [busca, setBusca] = useState("");
  const [value, setValue] = useState("descricao");
  const estadoFiltro = useAppSelector(selectFiltro).filtrar;
  const dispatch = useAppDispatch();

  const handleFiltro = () => {
    dispatch(checkForm(false));
    dispatch(checkFiltro(true));
  };

  const handleBusca = () => {
    dispatch(filtrarRecados({ busca: busca, operacao: value }));
    dispatch(checkMostrar(false));
  };

  const handleCancelFormFiltro = () => {
    dispatch(buscarRecados());
    dispatch(checkFiltro(false));
    dispatch(checkFiltro(false));
    setBusca("");
    setValue("descricao");
  };

  return (
    <>
      <ButtonStyled
        onClick={handleFiltro}
        icon={<FilterAltIcon />}
        txt={"Filtrar"}
      />
      {estadoFiltro ? (
        <BoxForm>
          <BoxItens>
            <RadioGroupStyled
              aria-labelledby="demo-radio-buttons-group-label"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="descricao"
                control={<Radio />}
                label="Descrição"
              />
              <FormControlLabel
                value="detalhamento"
                control={<Radio />}
                label="Detalhamento"
              />
              <FormControlLabel
                value="status"
                control={<Radio />}
                label="Status"
              />
            </RadioGroupStyled>

            {value == "descricao" || value == "detalhamento" ? (
              <TextField
                id="input-buscar"
                fullWidth
                label="Buscar"
                variant="outlined"
                placeholder="Digite aqui..."
                onChange={(e) => setBusca(e.target.value)}
                value={busca}
                sx={{
                  margin: "10px",
                  fontFamily: '"Josefin Sans", sans-serif',
                }}
              />
            ) : (
              <>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontFamily: '"Josefin Sans", sans-serif',
                    margin: "5px",
                  }}
                >
                  Escolha:
                </Typography>
                <RadioGroupStyled
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  name="radio-buttons-group"
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
              </>
            )}

            <BoxButtons>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={6}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <ButtonStyled
                    onClick={handleBusca}
                    icon={<PlagiarismIcon />}
                    txt={"Buscar"}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={6}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <ButtonStyled
                    onClick={handleCancelFormFiltro}
                    icon={<CancelIcon />}
                    txt={"Cancelar"}
                  />
                </Grid>
              </Grid>
            </BoxButtons>
          </BoxItens>
        </BoxForm>
      ) : (
        <></>
      )}
    </>
  );
};

export default Filtragem;
