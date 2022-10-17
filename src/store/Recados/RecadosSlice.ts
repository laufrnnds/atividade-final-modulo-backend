import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  atualizarRecadoApi,
  buscarRecadoIdApi,
  buscarRecadosApi,
  criarRecadoApi,
  excluirRecadoApi,
  filtrarRecadosApi,
} from "../../service/api";
import { Recado, RecadoRequest } from "./types";

export interface RecadosSliceParametro {
  id: number;
  descricao: string;
  detalhamento: string;
  status: string;
}

export interface RecadoBuscado {
  busca: string;
  operacao: string;
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
    return {
      message: response,
      id,
    };
  }
);

export const buscarRecadoId = createAsyncThunk(
  "recados/buscarRecadoId",
  async (id: number) => {
    const url = `/${id}`;
    const response = await buscarRecadoIdApi(url);
    return response;
  }
);

export const filtrarRecados = createAsyncThunk(
  "recados/filtrarRecados",
  async (dado: RecadoBuscado) => {
    const response = await filtrarRecadosApi("/filter", {
      busca: dado.busca,
      operacao: dado.operacao,
    });
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
    setAll: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(buscarRecados.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(buscarRecados.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
    });
    builder.addCase(criarRecado.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(criarRecado.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id === 0) {
        state.message = "Não foi possivel criar o recado";
        return state;
      }

      state.message = "Recado salvo com sucesso!";
      adapter.addOne(state, action.payload);
    });
    builder.addCase(atualizarRecado.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(atualizarRecado.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload.id === 0) {
        state.message = "Não foi possivel atualizar o recado.";
        return state;
      }

      state.message = "Recado atualizado com sucesso!";
      adapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
    builder.addCase(excluirRecado.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(excluirRecado.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload.message === "não foi possivel excluir") {
        state.message = action.payload.message;
        return state;
      }

      state.message = action.payload.message;
      adapter.removeOne(state, action.payload.id);
    });
    builder.addCase(filtrarRecados.fulfilled, (state, action) => {
      state.loading = false;
      adapter.setAll(state, action.payload);
      console.log(action.payload);
    });
  },
});

export const { addOne, updateOne, removeOne, setAll } = RecadosSlice.actions;
export default RecadosSlice.reducer;
