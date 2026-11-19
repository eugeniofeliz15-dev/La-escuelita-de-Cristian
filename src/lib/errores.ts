import axios from "axios";

export function mensajeError(error: unknown, mensajePorDefecto: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || mensajePorDefecto;
  }
  return mensajePorDefecto;
}