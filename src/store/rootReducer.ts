import { combineReducers } from "@reduxjs/toolkit";
import recados from "../store/Recados/index";
import botoes from "../store/Botoes/BotoesSlice";
import form from "../store/Form/FormSlice";
import recado from "../store/Recados/RecadoSlice";
import arquivados from "../store/Arquivados/ArquivadosSlice";
import mostrar from "../store/Mostrar/MostrarSlice";
import filtrar from "../store/Filtrar/FiltrarSlice";
const combinedReducer = combineReducers({
  recados,
  botoes,
  form,
  filtrar,
  mostrar,
  recado,
  arquivados,
});

export default combinedReducer;
