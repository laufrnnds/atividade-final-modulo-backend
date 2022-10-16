import React from "react";
import RecadoAccordion from "./RecadoAccordion";
import { Box } from "@mui/material";
import { Recado } from "../store/Recados/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAll } from "../store/Recados/RecadosSlice";
import { selectAllArquiv } from "../store/Arquivados/ArquivadosSlice";
import defaultTheme from "../config/theme/Default";

const RecadosContent: React.FC = () => {
  const listaRecados = useAppSelector(selectAll);
  const listaArquivados = useAppSelector(selectAllArquiv);
  const estadoMostrar = useAppSelector(
    (state) => state.mostrar.mostrou.payload
  );
  return (
    <Box sx={{ width: "50%", margin: "30px" }}>
      {estadoMostrar == false ? (
        <Box>
          {listaRecados.map((recado: Recado) => {
            return (
              <RecadoAccordion
                key={recado.id}
                id={recado.id}
                descricao={recado.descricao}
                detalhamento={recado.detalhamento}
                status={recado.status}
                dado={recado}
                color={"0E4562"}
                arquivado={false}
              />
            );
          })}
        </Box>
      ) : (
        <Box>
          {listaArquivados.map((recado: Recado) => {
            return (
              <RecadoAccordion
                key={recado.id}
                id={recado.id}
                descricao={recado.descricao}
                detalhamento={recado.detalhamento}
                status={recado.status}
                dado={recado}
                color={"437791"}
                arquivado={true}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default RecadosContent;
