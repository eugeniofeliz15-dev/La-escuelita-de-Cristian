import { api } from "../lib/axios";
import type { ApiResponse } from "../types/curso";
import type { Usuario } from "../types/usuario";

interface AuthData {
  token: string;
  usuario: Usuario;
}

export const authService = {
  login: async (username: string, password: string): Promise<AuthData> => {
    const response = await api.post<ApiResponse<AuthData>>("/auth/login", {
      username,
      password,
    });
    return response.data.data;
  },

  registro: async (
    username: string,
    password: string,
    nombre: string,
    apellido: string,
    email: string,
  ): Promise<AuthData> => {
    const response = await api.post<ApiResponse<AuthData>>("/auth/register", {
      username,
      password,
      nombre,
      apellido,
      email,
    });
    return response.data.data;
  },

  getPerfil: async (): Promise<Usuario> => {
    const response = await api.get<ApiResponse<Usuario>>("/auth/perfil");
    return response.data.data;
  },
};