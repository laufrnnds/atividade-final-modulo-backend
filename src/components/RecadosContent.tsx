import React, { useEffect } from "react";
import RecadoAccordion from "./RecadoAccordion";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { selectAll } from "../store/Recados/RecadosSlice";
import defaultTheme from "../config/theme/Default";

const RecadosContent: React.FC = () => {
  const listaRecados = useAppSelector(selectAll);

  return (
    <Box sx={{ width: "50%", margin: "30px" }}>
      <Box>
        {listaRecados.map((recado) => {
          return (
            <RecadoAccordion
              key={recado.id}
              id={recado.id}
              descricao={recado.descricao}
              detalhamento={recado.detalhamento}
              status={recado.status}
              dado={recado}
              color={defaultTheme.palette.secondary.main}
              arquivado={false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default RecadosContent;
