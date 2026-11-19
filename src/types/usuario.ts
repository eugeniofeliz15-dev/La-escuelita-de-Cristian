export type Rol = "ESTUDIANTE" | "ADMIN";

export interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  fotoUrl: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}