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
import { checkMostrar, selectMostrar } from "../../store/Mostrar/MostrarSlice";
import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ButtonStyled from "../../components/ButtonStyled";
import RecadosContentArquiv from "../../components/RecadosContentArquiv";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const estadoMostrar = useAppSelector(selectMostrar).mostrou;

  useEffect(() => {
    dispatch(buscarRecados());
    dispatch(checkMostrar(false));
  }, []);

  const handleArquivados = () => {
    dispatch(checkMostrar(true));
  };

  const handleNaoArquivados = () => {
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
        <ButtonStyled
          onClick={handleArquivados}
          icon={<FileDownloadIcon />}
          txt={"Arquivados"}
        />
      ) : (
        <>
          <ButtonStyled
            onClick={handleNaoArquivados}
            icon={<FileDownloadOffIcon />}
            txt={"Desarquivados"}
          />
          <RecadosContentArquiv />
        </>
      )}
      <RecadosContent />
    </Box>
  );
};

export default Home;
