import { api } from "../lib/axios";
import type { ApiResponse } from "../types/curso";
import type { Inscripcion } from "../types/inscripcion";

export const inscripcionesService = {
  getMisInscripciones: async (
    limit = 100,
  ): Promise<{ inscripciones: Inscripcion[]; total: number }> => {
    const response = await api.get<ApiResponse<Inscripcion[]>>("/inscripciones", {
      params: { limit },
    });
    return {
      inscripciones: response.data.data,
      total: response.data.meta?.total ?? response.data.data.length,
    };
  },

  inscribirse: async (cursoId: number, estudianteId: number): Promise<Inscripcion> => {
    const response = await api.post<ApiResponse<Inscripcion>>("/inscripciones", {
      cursoId,
      estudianteId,
    });
    return response.data.data;
  },
};