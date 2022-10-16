import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  check: true,
};

const BotoesSlice = createSlice({
  name: "botoes",
  initialState,
  reducers: {
    checkBotoes(state, payload) {
      state.check = payload;
    },
  },
});

export const { checkBotoes } = BotoesSlice.actions;
export default BotoesSlice.reducer;
