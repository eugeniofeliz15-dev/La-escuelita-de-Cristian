import { api } from "../lib/axios";
import type { ApiResponse, Curso } from "../types/curso";

export const cursosService = {
  getTodos: async (limit = 100): Promise<{ cursos: Curso[]; total: number }> => {
    const response = await api.get<ApiResponse<Curso[]>>("/cursos", {
      params: { limit },
    });
    return {
      cursos: response.data.data,
      total: response.data.meta?.total ?? response.data.data.length,
    };
  },

  getPorId: async (id: number): Promise<Curso> => {
    const response = await api.get<ApiResponse<Curso>>(`/cursos/${id}`);
    return response.data.data;
  },
};