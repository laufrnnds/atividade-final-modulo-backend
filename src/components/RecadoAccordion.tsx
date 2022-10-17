import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import defaultTheme from "../config/theme/Default";
import { checkBotoes } from "../store/Botoes/BotoesSlice";
import { checkForm } from "../store/Form/FormSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  criarRecado,
  excluirRecado,
  removeOne,
  selectAll,
} from "../store/Recados/RecadosSlice";
import { Recado, RecadoRequest } from "../store/Recados/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  addOneArquiv,
  removeOneArquiv,
  selectAllArquiv,
} from "../store/Arquivados/ArquivadosSlice";
import { checkMostrar } from "../store/Mostrar/MostrarSlice";
import ButtonStyled from "./ButtonStyled";
import { selecionarRecado } from "../store/Recados/RecadoSlice";

// interface RecadoAccordionProps extends Recado {
//   dado: Recado;
//   color: string;
//   arquivado: boolean;
// }

interface RecadoAccordionProps {
  id: number;
  descricao: string;
  detalhamento: string;
  status: string;
  dado: Recado;
  color: string;
  arquivado: boolean;
}

const BoxTxt = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

const TypographyStyled = styled(Typography)({
  fontFamily: '"Josefin Sans", sans-serif',
});

const BoxButtons = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "row",
});

const RecadoAccordion: React.FC<RecadoAccordionProps> = ({
  id,
  descricao,
  detalhamento,
  status,
  dado,
  color,
  arquivado,
}) => {
  const listaRecados = useAppSelector(selectAll);
  const listaArquivados = useAppSelector(selectAllArquiv);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkMostrar(false));
  }, [listaRecados]);

  useEffect(() => {
    dispatch(checkMostrar(true));
  }, [listaArquivados]);

  const handleEditar = () => {
    console.log("entrou editar");
    dispatch(selecionarRecado(dado));
    dispatch(checkBotoes(false));
    dispatch(checkForm(true));
  };

  const handleApagar = () => {
    if (arquivado == true) {
      dispatch(removeOneArquiv(id));
    } else {
      dispatch(excluirRecado(id));
    }
  };

  function handleArquivar() {
    dispatch(addOneArquiv(dado));
    dispatch(excluirRecado(id));
  }

  function handleDesarquivar() {
    const novoRecado: RecadoRequest = {
      descricao: descricao,
      detalhamento: detalhamento,
      status: status,
    };
    dispatch(removeOneArquiv(id));
    dispatch(criarRecado(novoRecado));
  }

  return (
    <Accordion sx={{ width: "100%", margin: "5px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: color,
          color: "white",
        }}
      >
        <BoxTxt>
          <TypographyStyled variant="body1">
            {id}# {descricao}
          </TypographyStyled>

          <TypographyStyled
            variant="body1"
            sx={{
              paddingRight: "30px",
            }}
          >
            Status: {status}
          </TypographyStyled>
        </BoxTxt>
      </AccordionSummary>
      <AccordionDetails sx={{ overflowY: "auto", marginTop: "5px" }}>
        <TypographyStyled
          variant="body1"
          sx={{
            marginBottom: "20px",
          }}
        >
          {detalhamento}
        </TypographyStyled>
        {arquivado ? (
          <TypographyStyled variant="body2">Arquivado</TypographyStyled>
        ) : (
          <></>
        )}
        <BoxButtons>
          <ButtonStyled
            onClick={handleEditar}
            icon={<EditIcon />}
            txt={"Editar"}
          />
          <ButtonStyled
            onClick={handleApagar}
            icon={<DeleteForeverIcon />}
            txt={"Deletar"}
          />
          {arquivado ? (
            <ButtonStyled
              onClick={handleDesarquivar}
              icon={<FileUploadIcon />}
              txt={"Desarquivar"}
            />
          ) : (
            <ButtonStyled
              onClick={handleArquivar}
              icon={<FileDownloadIcon />}
              txt={"Arquivar"}
            />
          )}
        </BoxButtons>
      </AccordionDetails>
    </Accordion>
  );
};

export default RecadoAccordion;
