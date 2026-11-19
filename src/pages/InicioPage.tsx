import { useAuthStore } from "../store/useAuthStore";
import { InicioEstudiante } from "./InicioEstudiante";
import { InicioAdmin } from "./InicioAdmin";

export function InicioPage() {
  const usuario = useAuthStore((s) => s.usuario);

  if (usuario?.rol === "ADMIN") {
    return <InicioAdmin />;
  }

  return <InicioEstudiante />;
}