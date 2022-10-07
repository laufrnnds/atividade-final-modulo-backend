import axios from "axios";
import { Recado, RecadoRequest } from "../store/Recados/types";

const api = axios.create({
  baseURL: "https://api-backend-laura.herokuapp.com/sistemaDeRecados/recados",
});

async function buscarRecadosApi(url: string) {
  const response = await api.get(url);
  return response.data;
}

async function criarRecadoApi(
  url: string,
  data: RecadoRequest
): Promise<string> {
  try {
    const response = await api.post(url, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return "não foi possivel salvar";
  }
}

async function excluirRecadoApi(url: string): Promise<string> {
  try {
    const response = await api.delete(`${url}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("não deu");
    return "não foi possivel excluir";
  }
}

async function atualizarRecadoApi(url: string, data: Recado): Promise<string> {
  try {
    const dataRequest = {
      descricao: data.descricao,
      detalhamento: data.detalhamento,
    };
    const response = await api.put(`${url}`, dataRequest);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("não deu");
    return "não foi possivel atualizar o recado";
  }
}

export {
  buscarRecadosApi,
  criarRecadoApi,
  excluirRecadoApi,
  atualizarRecadoApi,
};
