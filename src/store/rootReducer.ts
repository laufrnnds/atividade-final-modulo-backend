import { combineReducers } from "@reduxjs/toolkit";
import recados from "../store/Recados/index";
import botoes from "../store/Botoes/BotoesSlice";
import form from "../store/Form/FormSlice";
const combinedReducer = combineReducers({
  recados,
  botoes,
  form,
});

export default combinedReducer;
