import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Recado } from "./types";

const initialState: Recado = {
  id: 0,
  descricao: "",
  detalhamento: "",
  status: "cancelado",
};

const recadoSlice = createSlice({
  name: "recado",
  initialState,
  reducers: {
    selecionarRecado(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { selecionarRecado, clear } = recadoSlice.actions;
export const selectRecado = (state: RootState): Recado => state.recado;
export default recadoSlice.reducer;
