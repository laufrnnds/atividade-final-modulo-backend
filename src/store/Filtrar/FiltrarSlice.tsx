import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  filtrar: false,
};

const FiltrarSlice = createSlice({
  name: "filtrar",
  initialState,
  reducers: {
    checkFiltro(state, payload) {
      state.filtrar = payload;
    },
  },
});

export const { checkFiltro } = FiltrarSlice.actions;
export default FiltrarSlice.reducer;
