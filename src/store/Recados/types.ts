export interface Recado {
  id: number;
  descricao: string;
  detalhamento: string;
  status: string;
}

export interface RecadoRequest {
  descricao: string;
  detalhamento: string;
  status: string;
}
