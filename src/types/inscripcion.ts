import type { Curso } from "./curso";
import type { Usuario } from "./usuario";

export type EstadoInscripcion = "ACTIVA" | "CANCELADA" | "COMPLETADA";

export interface Inscripcion {
  id: number;
  estado: EstadoInscripcion;
  fechaInscripcion: string;
  estudiante: Pick<Usuario, "id" | "nombre" | "apellido">;
  curso: Pick<Curso, "id" | "codigo" | "nombre" | "creditos">;
  calificaciones: unknown[];
}