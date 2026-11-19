import { api } from "../lib/axios";
import type { Usuario } from "../types/usuario";

interface LoginResponse {
  token: string;
  usuario: Usuario;
}

interface RegistroResponse {
  token: string;
  usuario: Usuario;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });
    return response.data;
  },

  registro: async (nombre: string, email: string, password: string): Promise<RegistroResponse> => {
    const response = await api.post<RegistroResponse>("/auth/registro", { nombre, email, password });
    return response.data;
  },
};