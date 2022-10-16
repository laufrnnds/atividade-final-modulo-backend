import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export interface ArquivadosSlice {
  id: number;
  descricao: string;
  detalhamento: string;
  status: string;
}

const adapter = createEntityAdapter<ArquivadosSlice>({
  selectId: (item) => item.id,
});

export const { selectAll: selectAllArquiv, selectById } = adapter.getSelectors(
  (state: any) => state.arquivados
);

const ArquivadosSlice = createSlice({
  name: "arquivados",
  initialState: adapter.getInitialState(),
  reducers: {
    addOneArquiv: adapter.addOne,
    removeOneArquiv: adapter.removeOne,
  },
});

export const { addOneArquiv, removeOneArquiv } = ArquivadosSlice.actions;
export default ArquivadosSlice.reducer;
