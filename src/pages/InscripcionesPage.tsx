import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import { Calendar, BookOpen } from "lucide-react";
import type { Inscripcion } from "../types/inscripcion";

export function InscripcionesPage() {
  // ✅ Hooks al principio
  const { data, cargando, error, recargar } = useApi(
    inscripcionesService.getMisInscripciones,
    [],
  );

  if (cargando) return <Spinner mensaje="Cargando inscripciones..." />;

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={recargar}
          className="rounded-lg bg-marca-600 px-6 py-2 text-white hover:bg-marca-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const inscripciones = (data?.inscripciones ?? []) as Inscripcion[];

  if (inscripciones.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-slate-600">
          Aún no estás inscrito en ningún curso.
        </p>
        <Link
          to="/cursos"
          className="rounded-lg bg-marca-600 px-4 py-2 text-white hover:bg-marca-700"
        >
          Explorar cursos
        </Link>
      </div>
    );
  }

  const colorEstado = (estado: string) => {
    switch (estado) {
      case "ACTIVA":
        return "bg-green-100 text-green-700";
      case "CANCELADA":
        return "bg-red-100 text-red-700";
      case "COMPLETADA":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-marca-700 mb-2">Mis inscripciones</h1>
      <p className="text-slate-600 mb-6">
        {inscripciones.length} curso{inscripciones.length !== 1 ? "s" : ""} inscrito{inscripciones.length !== 1 ? "s" : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {inscripciones.map((insc) => (
          <div
            key={insc.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-mono text-xs text-slate-400">
                  {insc.curso.codigo}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {insc.curso.nombre}
                </h3>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${colorEstado(insc.estado)}`}
              >
                {insc.estado}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <BookOpen size={15} className="text-slate-400" />
                {insc.curso.creditos} créditos
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={15} className="text-slate-400" />
                {new Date(insc.fechaInscripcion).toLocaleDateString("es-DO")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}