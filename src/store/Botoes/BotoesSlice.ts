import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: { check: boolean } = {
  check: true,
};

const BotoesSlice = createSlice({
  name: "botoes",
  initialState,
  reducers: {
    checkBotoes(state, action) {
      state.check = action.payload;
    },
  },
});

export const { checkBotoes } = BotoesSlice.actions;
export const selectBotao = (state: RootState): { check: boolean } =>
  state.botoes;
export default BotoesSlice.reducer;
