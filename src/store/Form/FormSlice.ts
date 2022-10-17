import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: { aparece: boolean } = {
  aparece: false,
};

const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    checkForm(state, action) {
      state.aparece = action.payload;
    },
  },
});

export const { checkForm } = FormSlice.actions;
export const selectForm = (state: RootState): { aparece: boolean } =>
  state.form;
export default FormSlice.reducer;
