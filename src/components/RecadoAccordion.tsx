import * as React from "react";
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
import { salvarInfo } from "../store/RecadoBuscado/RecadoBuscado";
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

interface RecadoAccordionProps {
  id: number;
  descricao: string;
  detalhamento: string;
  status: string;
  dado: Recado;
  color: string;
  arquivado: boolean;
}

const BtnStyled = styled(Button)({
  margin: "5px",
  "&:hover": {
    backgroundColor: defaultTheme.palette.primary.light,
  },
  backgroundColor: defaultTheme.palette.primary.main,
  fontFamily: '"Josefin Sans", sans-serif',
});

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

  const handleEditar = () => {
    dispatch(salvarInfo({ id, descricao, detalhamento, status }));
    dispatch(checkBotoes(false));
    setTimeout(() => {
      dispatch(checkForm(true));
    }, 3000);
  };

  const handleApagar = () => {
    if (arquivado == true) {
      dispatch(removeOneArquiv(id));
    } else {
      dispatch(excluirRecado(id));
      dispatch(removeOne(id));
    }
  };

  function handleArquivar() {
    listaRecados.map((recado: Recado) => {
      if (recado.id == id) {
        dispatch(addOneArquiv(recado));
        dispatch(excluirRecado(id));
        dispatch(removeOne(id));
      }
    });
  }

  function handleDesarquivar() {
    listaArquivados.map((recado: Recado) => {
      if (recado.id == id) {
        const novoRecado: RecadoRequest = {
          descricao: descricao,
          detalhamento: detalhamento,
          status: status,
        };
        dispatch(removeOneArquiv(id));
        dispatch(criarRecado(novoRecado));
        window.location.reload();
        dispatch(checkMostrar(false));
      }
    });
  }

  return (
    <Accordion sx={{ width: "100%", margin: "5px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: `#${color}`,
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
          <BtnStyled variant="contained" onClick={handleEditar}>
            <EditIcon />
          </BtnStyled>
          <BtnStyled variant="contained" onClick={handleApagar}>
            <DeleteForeverIcon />
          </BtnStyled>
          {arquivado ? (
            <BtnStyled variant="contained" onClick={handleDesarquivar}>
              <FileUploadIcon />
            </BtnStyled>
          ) : (
            <BtnStyled variant="contained" onClick={handleArquivar}>
              <FileDownloadIcon />
            </BtnStyled>
          )}
        </BoxButtons>
      </AccordionDetails>
    </Accordion>
  );
};

export default RecadoAccordion;
