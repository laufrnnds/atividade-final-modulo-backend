import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: { filtrar: boolean } = {
  filtrar: false,
};

const FiltrarSlice = createSlice({
  name: "filtrar",
  initialState,
  reducers: {
    checkFiltro(state, action) {
      state.filtrar = action.payload;
    },
  },
});

export const { checkFiltro } = FiltrarSlice.actions;
export const selectFiltro = (state: RootState): { filtrar: boolean } =>
  state.filtrar;
export default FiltrarSlice.reducer;
