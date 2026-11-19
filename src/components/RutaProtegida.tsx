import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  children: React.ReactNode;
  rolRequerido?: "ADMIN" | "ESTUDIANTE";
}

export function RutaProtegida({ children, rolRequerido }: Props) {
  const token = useAuthStore((s) => s.token);
  const rol = useAuthStore((s) => s.usuario?.rol);

  if (!token) return <Navigate to="/login" replace />;
  if (rolRequerido && rol !== rolRequerido) return <Navigate to="/inicio" replace />;

  return <>{children}</>;
}