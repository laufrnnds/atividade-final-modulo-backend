import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  descricao: "",
  detalhamento: "",
  status: "",
};

const RecadoBuscadoSlice = createSlice({
  name: "recadobuscado",
  initialState,
  reducers: {
    salvarInfo(state, action) {
      return action.payload;
    },
    limparInfo() {
      return initialState;
    },
  },
});

export const { salvarInfo, limparInfo } = RecadoBuscadoSlice.actions;
export default RecadoBuscadoSlice.reducer;
