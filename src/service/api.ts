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
): Promise<Recado> {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      id: 0,
      detalhamento: "",
      descricao: "",
      status: "concluido",
    };
  }
}

async function buscarRecadoIdApi(url: string): Promise<string> {
  try {
    const response = await api.get(`${url}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return "não foi possivel encontrar";
  }
}

async function excluirRecadoApi(url: string): Promise<string> {
  try {
    const response = await api.delete(`${url}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return "não foi possivel excluir";
  }
}

async function atualizarRecadoApi(url: string, data: Recado): Promise<Recado> {
  try {
    const dataRequest = {
      descricao: data.descricao,
      detalhamento: data.detalhamento,
      status: data.status,
    };
    const response = await api.put(`${url}`, dataRequest);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return {
      id: 0,
      detalhamento: "",
      descricao: "",
      status: "concluido",
    };
  }
}

async function filtrarRecadosApi(
  url: string,
  params: { busca: string; operacao: string }
): Promise<Recado[]> {
  try {
    const response = await api.get(url, { params });
    console.log(response.data);
    return response.data;
  } catch (err) {
    return [];
  }
}

export {
  buscarRecadosApi,
  criarRecadoApi,
  excluirRecadoApi,
  atualizarRecadoApi,
  filtrarRecadosApi,
  buscarRecadoIdApi,
};
