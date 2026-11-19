import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { inscripcionesService } from "../services/inscripciones";
import { mensajeError } from "../lib/errores";
import { Spinner } from "../components/Spinner";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import type { Curso } from "../types/curso";

export function CursoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);

  // ✅ Hooks al principio
  const { data: curso, cargando, error, recargar } = useApi(
    () => cursosService.getPorId(Number(id)),
    [id],
  );

  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "exito" | "error"; texto: string } | null>(null);

  if (cargando) return <Spinner mensaje="Cargando curso..." />;

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <div className="flex gap-2">
          <button
            onClick={recargar}
            className="rounded-lg bg-marca-600 px-4 py-2 text-white hover:bg-marca-700"
          >
            Reintentar
          </button>
          <button
            onClick={() => navigate("/cursos")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Volver a cursos
          </button>
        </div>
      </div>
    );
  }

  const c = curso as Curso;
  const cuposDisponibles = c.cupo - c.inscritos;
  const sinCupos = cuposDisponibles <= 0;

  const handleInscribirme = async () => {
    if (!usuario) return;
    setEnviando(true);
    setMensaje(null);

    try {
      await inscripcionesService.inscribirse(c.id, usuario.id);
      setMensaje({ tipo: "exito", texto: "¡Te inscribiste correctamente!" });
      recargar(); // Recarga para actualizar los cupos
    } catch (err) {
      const msg = mensajeError(err, "No se pudo completar la inscripción");
      setMensaje({ tipo: "error", texto: msg });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/cursos")}
        className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-marca-600"
      >
        <ArrowLeft size={16} />
        Volver a cursos
      </button>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <span className="font-mono text-xs text-slate-400">{c.codigo}</span>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">{c.nombre}</h1>
        <p className="mt-3 text-slate-600">{c.descripcion}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Docente</p>
            <p className="font-medium text-slate-900">
              {c.docente
                ? `${c.docente.nombre} ${c.docente.apellido}`
                : "Por asignar"}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Créditos</p>
            <p className="font-medium text-slate-900">{c.creditos}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Cupo total</p>
            <p className="font-medium text-slate-900">{c.cupo}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Inscritos</p>
            <p className="font-medium text-slate-900">{c.inscritos}</p>
          </div>
        </div>

        {/* Mensajes */}
        {mensaje && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-lg p-4 ${
              mensaje.tipo === "exito"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {mensaje.tipo === "exito" ? (
              <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
            )}
            <p className="text-sm">{mensaje.texto}</p>
          </div>
        )}

        {/* Botón de inscripción */}
        <div className="mt-6">
          {sinCupos ? (
            <button
              disabled
              className="w-full rounded-lg bg-slate-200 py-3 text-slate-500 font-medium cursor-not-allowed"
            >
              Sin cupos disponibles
            </button>
          ) : (
            <button
              onClick={handleInscribirme}
              disabled={enviando}
              className="w-full rounded-lg bg-marca-600 py-3 text-white font-medium hover:bg-marca-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {enviando ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Inscribiendo...
                </>
              ) : (
                "Inscribirme"
              )}
            </button>
          )}
        </div>

        <Link
          to="/inscripciones"
          className="mt-3 block text-center text-sm text-marca-600 hover:underline"
        >
          Ver mis inscripciones →
        </Link>
      </div>
    </div>
  );
}