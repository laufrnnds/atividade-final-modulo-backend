import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: { mostrou: boolean } = {
  mostrou: false,
};

const MostrarSlice = createSlice({
  name: "mostrar",
  initialState,
  reducers: {
    checkMostrar(state, action) {
      state.mostrou = action.payload;
    },
  },
});

export const { checkMostrar } = MostrarSlice.actions;
export const selectMostrar = (state: RootState): { mostrou: boolean } =>
  state.mostrar;
export default MostrarSlice.reducer;
