export interface Recado extends RecadoRequest {
  id: number;
}

export type Status = "concluido" | "pendente" | "cancelado";

export interface RecadoRequest {
  descricao: string;
  detalhamento: string;
  status: string;
}
