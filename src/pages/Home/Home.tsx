import React, { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Formulario from "../../components/Formulario";
import Header from "../../components/Header";
import RecadosContent from "../../components/RecadosContent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { buscarRecados } from "../../store/Recados/RecadosSlice";
import Filtragem from "../../components/Filtragem";
import defaultTheme from "../../config/theme/Default";
import { checkMostrar } from "../../store/Mostrar/MostrarSlice";
import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const BtnStyled = styled(Button)({
  margin: "5px",
  "&:hover": {
    backgroundColor: defaultTheme.palette.primary.light,
  },
  backgroundColor: defaultTheme.palette.primary.main,
  fontFamily: '"Josefin Sans", sans-serif',
});

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const estadoMostrar = useAppSelector(
    (state) => state.mostrar.mostrou.payload
  );

  useEffect(() => {
    dispatch(buscarRecados());
    dispatch(checkMostrar(false));
  }, []);

  const handleArquivados = () => {
    console.log("entrou arquivar");
    dispatch(checkMostrar(true));
  };

  const handleNaoArquivados = () => {
    console.log("entrou não arquivar");
    dispatch(checkMostrar(false));
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <Header />
      <Typography
        variant="h3"
        align="center"
        sx={{ fontFamily: '"Josefin Sans", sans-serif', margin: "20px" }}
      >
        Recados
      </Typography>
      <Formulario />
      <Filtragem />
      {estadoMostrar == false ? (
        <BtnStyled variant="contained" onClick={handleArquivados}>
          <FileDownloadIcon />
        </BtnStyled>
      ) : (
        <BtnStyled variant="contained" onClick={handleNaoArquivados}>
          <FileDownloadOffIcon />
        </BtnStyled>
      )}
      <RecadosContent />
    </Box>
  );
};

export default Home;
