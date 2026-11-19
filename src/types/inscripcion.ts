import type { Curso } from "./curso";

export interface Inscripcion {
  id: number;
  estado: "ACTIVA" | "CANCELADA" | "COMPLETADA";
  fechaInscripcion: string;
  curso: Pick<Curso, "id" | "codigo" | "nombre" | "creditos">;
}