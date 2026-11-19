export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
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
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}