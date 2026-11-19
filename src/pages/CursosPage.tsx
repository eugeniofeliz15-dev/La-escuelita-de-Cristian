import { useState, useMemo } from "react";
import { Buscador } from "../components/Buscador";
import { TarjetaCurso } from "../components/TarjetaCurso";
import { Spinner } from "../components/Spinner";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import type { Curso } from "../types/curso";

export function CursosPage() {
  // ✅ Hooks SIEMPRE al principio (antes de cualquier if return)
  const [busqueda, setBusqueda] = useState("");
  const { data, cargando, error, recargar } = useApi(cursosService.getTodos, []);

  // ✅ Filtrado con useMemo (en cliente, como pide el enunciado)
  const cursosFiltrados = useMemo(() => {
    const cursos = (data?.cursos ?? []) as Curso[];
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return cursos;
    return cursos.filter(
      (curso) =>
        curso.nombre.toLowerCase().includes(texto) ||
        curso.codigo.toLowerCase().includes(texto),
    );
  }, [data, busqueda]);

  // ✅ 1. Cargando
  if (cargando) return <Spinner mensaje="Cargando cursos..." />;

  // ✅ 2. Error con Reintentar
  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-center text-red-600">{error}</p>
        <button
          onClick={recargar}
          className="rounded-lg bg-marca-600 px-6 py-2 text-white font-medium hover:bg-marca-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // ✅ 3. Sin resultados
  if (cursosFiltrados.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2">
        <p className="text-lg text-slate-600">
          {busqueda
            ? `No se encontraron cursos para "${busqueda}"`
            : "No hay cursos disponibles en este momento."}
        </p>
        {busqueda && (
          <button
            onClick={() => setBusqueda("")}
            className="text-sm text-marca-600 hover:underline"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>
    );
  }

  // ✅ 4. Renderizado
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-marca-700">Cursos disponibles</h1>
          <p className="text-slate-600 mt-1">
            {cursosFiltrados.length} curso{cursosFiltrados.length !== 1 ? "s" : ""}{" "}
            {busqueda ? "encontrados" : "en total"}
          </p>
        </div>
        <Buscador
          valor={busqueda}
          onCambiar={setBusqueda}
          placeholder="Buscar por nombre o código..."
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cursosFiltrados.map((curso) => (
          <TarjetaCurso key={curso.id} curso={curso} />
        ))}
      </div>
    </div>
  );
}