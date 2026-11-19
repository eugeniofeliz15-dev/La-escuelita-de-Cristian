import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from "../services/auth";
import { mensajeError } from "../lib/errores";

export function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const passwordValido = tieneMayuscula && tieneNumero && password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValido) {
      setError("La contraseña debe tener al menos 6 caracteres, una mayúscula y un número");
      return;
    }

    setCargando(true);
    setError("");

    try {
      const { token, usuario } = await authService.registro(
        username,
        password,
        nombre,
        apellido,
        email,
      );
      login(token, usuario);
      navigate("/inicio");
    } catch (err) {
      setError(mensajeError(err, "No se pudo crear la cuenta"));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-slate-200">
        <h1 className="text-2xl font-bold text-center text-marca-700 mb-1">
          Crear cuenta
        </h1>
        <p className="text-center text-slate-600 mb-6">Únete a La Escuelita de Cristian</p>

        {error && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-marca-500 focus:ring-2 focus:ring-marca-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Apellido</label>
              <input
                type="text"
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-marca-500 focus:ring-2 focus:ring-marca-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuario</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-marca-500 focus:ring-2 focus:ring-marca-100 outline-none"
              placeholder="ej: cristian.feliz"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-marca-500 focus:ring-2 focus:ring-marca-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-marca-500 focus:ring-2 focus:ring-marca-100 outline-none"
              placeholder="Mínimo 6 caracteres, 1 mayúscula, 1 número"
            />
            <div className="mt-2 space-y-1 text-xs">
              <p className={tieneMayuscula ? "text-green-600" : "text-slate-400"}>
                {tieneMayuscula ? "✓" : "○"} Al menos una mayúscula
              </p>
              <p className={tieneNumero ? "text-green-600" : "text-slate-400"}>
                {tieneNumero ? "✓" : "○"} Al menos un número
              </p>
              <p className={password.length >= 6 ? "text-green-600" : "text-slate-400"}>
                {password.length >= 6 ? "✓" : "○"} Mínimo 6 caracteres
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando || !passwordValido}
            className="w-full rounded-lg bg-marca-600 py-2.5 text-white font-medium hover:bg-marca-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {cargando ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creando cuenta...
              </>
            ) : (
              "Registrarme"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-marca-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}