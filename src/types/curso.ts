export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  fotoUrl: string | null;
}

export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  creditos: number;
  cupo: number;
  inscritos: number;
  docente: Docente | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiMeta {
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: ApiMeta;
}