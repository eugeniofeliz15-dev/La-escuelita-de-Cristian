import { useAuthStore } from "../store/useAuthStore";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { Spinner } from "../components/Spinner";
import { BookOpen, Users } from "lucide-react";

export function InicioAdmin() {
  const usuario = useAuthStore((s) => s.usuario);

  // ✅ Hooks al principio
  const { data, cargando, error } = useApi(cursosService.getTodos, []);

  if (cargando) return <Spinner mensaje="Cargando estadísticas..." />;
  if (error) return <p className="text-red-600">{error}</p>;

  const totalCursos = data?.total ?? 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-marca-700 mb-2">
        Panel de Administración
      </h1>
      <p className="text-slate-600 mb-8">
        Hola {usuario?.nombre} {usuario?.apellido}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total de cursos</p>
              <p className="text-2xl font-bold text-slate-900">{totalCursos}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-700">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total de estudiantes</p>
              <p className="text-2xl font-bold text-slate-900">—</p>
              <p className="text-xs text-slate-400 mt-1">
                (Requiere endpoint /usuarios)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}