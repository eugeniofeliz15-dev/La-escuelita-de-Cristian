import { useAuthStore } from "../store/useAuthStore";
import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";
import { Spinner } from "../components/Spinner";
import { BookOpen, GraduationCap, Award } from "lucide-react";
import type { Inscripcion } from "../types/inscripcion";

export function InicioEstudiante() {
  const usuario = useAuthStore((s) => s.usuario);

  // ✅ Hooks al principio (antes de cualquier if return)
  const { data, cargando, error } = useApi(
    inscripcionesService.getMisInscripciones,
    [],
  );

  if (cargando) return <Spinner mensaje="Cargando tu información..." />;
  if (error) return <p className="text-red-600">{error}</p>;

  const inscripciones = (data?.inscripciones ?? []) as Inscripcion[];
  const activas = inscripciones.filter((i) => i.estado === "ACTIVA");
  const totalCreditos = activas.reduce((acc, i) => acc + (i.curso.creditos ?? 0), 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-marca-700 mb-2">
        ¡Bienvenido, {usuario?.nombre}!
      </h1>
      <p className="text-slate-600 mb-8">Este es tu resumen académico</p>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Cursos inscritos</p>
              <p className="text-2xl font-bold text-slate-900">{activas.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3 text-green-700">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Créditos totales</p>
              <p className="text-2xl font-bold text-slate-900">{totalCreditos}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-100 p-3 text-amber-700">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Rol</p>
              <p className="text-2xl font-bold text-slate-900">{usuario?.rol}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}