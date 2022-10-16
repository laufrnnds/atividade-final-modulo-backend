import { combineReducers } from "@reduxjs/toolkit";
import recados from "../store/Recados/index";
import botoes from "../store/Botoes/BotoesSlice";
import form from "../store/Form/FormSlice";
import recadobuscado from "../store/RecadoBuscado/RecadoBuscado";
import arquivados from "../store/Arquivados/ArquivadosSlice";
import mostrar from "../store/Mostrar/MostrarSlice";
import filtrar from "../store/Filtrar/FiltrarSlice";
const combinedReducer = combineReducers({
  recados,
  botoes,
  form,
  filtrar,
  mostrar,
  recadobuscado,
  arquivados,
});

export default combinedReducer;
