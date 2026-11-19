import { Link } from "react-router-dom";
import type { Curso } from "../types/curso";

interface Props {
  curso: Curso;
}

export function TarjetaCurso({ curso }: Props) {
  const cuposDisponibles = curso.cupo - curso.inscritos;
  const porcentaje = (curso.inscritos / curso.cupo) * 100;
  const sinCupos = cuposDisponibles <= 0;

  return (
    <Link
      to={`/cursos/${curso.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="h-2 bg-gradient-to-r from-marca-500 to-marca-700" />
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-xs text-slate-400">{curso.codigo}</span>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">{curso.nombre}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{curso.descripcion}</p>

        <div className="mt-4 space-y-1.5 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <span className="text-slate-400">👨‍🏫</span>
            {curso.docente
              ? `${curso.docente.nombre} ${curso.docente.apellido}`
              : "Por asignar"}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-slate-400">📚</span>
            {curso.creditos} créditos
          </p>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Cupos ocupados</span>
            <span className="font-medium text-slate-700">
              {curso.inscritos}/{curso.cupo}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div
              className={`h-2 rounded-full transition-all ${
                sinCupos ? "bg-red-500" : "bg-marca-500"
              }`}
              style={{ width: `${Math.min(porcentaje, 100)}%` }}
            />
          </div>
          <p className="text-xs font-medium">
            {sinCupos ? (
              <span className="text-red-600">Sin cupos disponibles</span>
            ) : (
              <span className="text-slate-600">{cuposDisponibles} cupos disponibles</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}