import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    aparece: false
};

const FormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    checkForm(state, payload){
        state.aparece = payload;
    },
  },
});

export const { checkForm } = FormSlice.actions;
export default FormSlice.reducer;