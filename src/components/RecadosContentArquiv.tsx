import React, { useEffect } from "react";
import RecadoAccordion from "./RecadoAccordion";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectAllArquiv } from "../store/Arquivados/ArquivadosSlice";
import { selectMostrar } from "../store/Mostrar/MostrarSlice";
import defaultTheme from "../config/theme/Default";

const RecadosContentArquiv: React.FC = () => {
  const listaArquivados = useAppSelector(selectAllArquiv);
  const estadoMostrar = useAppSelector(selectMostrar).mostrou;

  return (
    <Box sx={{ width: "50%", margin: "30px" }}>
      <Box>
        {estadoMostrar ? (
          <>
            {listaArquivados.length > 0 ? (
              listaArquivados.map((recado) => {
                return (
                  <RecadoAccordion
                    key={recado.id}
                    id={recado.id}
                    descricao={recado.descricao}
                    detalhamento={recado.detalhamento}
                    status={recado.status}
                    dado={recado}
                    color={defaultTheme.palette.secondary.light}
                    arquivado={true}
                  />
                );
              })
            ) : (
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontFamily: '"Josefin Sans", sans-serif',
                  margin: "5px",
                }}
              >
                Sem recados arquivados
              </Typography>
            )}
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default RecadosContentArquiv;
