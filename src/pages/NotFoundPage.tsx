import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-8xl font-bold text-marca-600">404</h1>
      <p className="mt-4 text-xl text-slate-700">Página no encontrada</p>
      <p className="mt-2 text-slate-500">
        La ruta que buscas no existe en La Escuelita de Cristian.
      </p>
      <Link
        to="/inicio"
        className="mt-6 rounded-lg bg-marca-600 px-6 py-2.5 text-white font-medium hover:bg-marca-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}