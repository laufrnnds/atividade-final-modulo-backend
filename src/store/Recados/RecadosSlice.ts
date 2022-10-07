import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  atualizarRecadoApi,
  buscarRecadosApi,
  criarRecadoApi,
  excluirRecadoApi,
} from "../../service/api";
import { Recado, RecadoRequest } from "./types";

export interface RecadosSliceParametro {
  id: number;
  descricao: string;
  detalhamento: string;
}

export const buscarRecados = createAsyncThunk(
  "recados/buscarRecados",
  async () => {
    const response = await buscarRecadosApi("/all");
    return response;
  }
);

export const criarRecado = createAsyncThunk(
  "recados/criarRecado",
  async (dado: RecadoRequest) => {
    const response = await criarRecadoApi("/", dado);
    return response;
  }
);

export const atualizarRecado = createAsyncThunk(
  "recados/atualizarRecado",
  async (dado: Recado) => {
    const { id } = dado;
    const url = `/${id}`;
    const response = await atualizarRecadoApi(url, dado);
    return response;
  }
);

export const excluirRecado = createAsyncThunk(
  "recados/excluirRecado",
  async (id: number) => {
    const url = `/${id}`;
    const response = await excluirRecadoApi(url);
    return response;
  }
);

const adapter = createEntityAdapter<RecadosSliceParametro>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.recados
);

const RecadosSlice = createSlice({
  name: "recados",
  initialState: adapter.getInitialState({ loading: false, message: "" }),
  reducers: {
    addOne: adapter.addOne,
    updateOne: adapter.updateOne,
    removeOne: adapter.removeOne,
  },
  extraReducers(builder) {
    builder.addCase(buscarRecados.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buscarRecados.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
    });
    builder.addCase(criarRecado.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(atualizarRecado.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(excluirRecado.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
  },
});

export const { addOne, updateOne, removeOne } = RecadosSlice.actions;
export default RecadosSlice.reducer;
