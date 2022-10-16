import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  mostrou: false,
};

const MostrarSlice = createSlice({
  name: "mostrar",
  initialState,
  reducers: {
    checkMostrar(state, payload) {
      state.mostrou = payload;
    },
  },
});

export const { checkMostrar } = MostrarSlice.actions;
export default MostrarSlice.reducer;
