import axios from "axios";

export function mensajeError(error: unknown, mensajePorDefecto: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || mensajePorDefecto;
  }
  return mensajePorDefecto;
}