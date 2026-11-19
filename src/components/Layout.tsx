import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Home, BookOpen, GraduationCap, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  const usuario = useAuthStore((s) => s.usuario);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkBase = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
  const linkActivo = "bg-marca-600 text-white";
  const linkInactivo = "text-slate-700 hover:bg-slate-100";

  const links = [
    { to: "/inicio", label: "Inicio", icon: Home },
    { to: "/cursos", label: "Cursos", icon: BookOpen },
    { to: "/inscripciones", label: "Mis inscripciones", icon: GraduationCap },
  ];

  const esActivo = (ruta: string) => location.pathname === ruta;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header móvil */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <h1 className="text-lg font-bold text-marca-700">La Escuelita de Cristian</h1>
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          {menuAbierto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            menuAbierto ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white p-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
        >
          <div className="mb-8">
            <h1 className="text-xl font-bold text-marca-700">🎓 La Escuelita</h1>
            <p className="text-xs text-slate-500">de Cristian</p>
          </div>

          <div className="mb-6 rounded-lg bg-marca-50 p-3">
            <p className="text-xs text-slate-500">Conectado como</p>
            <p className="font-medium text-slate-900">
              {usuario?.nombre} {usuario?.apellido}
            </p>
            <span className="mt-1 inline-block rounded-full bg-marca-600 px-2 py-0.5 text-xs text-white">
              {usuario?.rol}
            </span>
          </div>

          <nav className="space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuAbierto(false)}
                className={`${linkBase} ${esActivo(to) ? linkActivo : linkInactivo}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-6 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </aside>

        {/* Overlay móvil */}
        {menuAbierto && (
          <div
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setMenuAbierto(false)}
          />
        )}

        {/* Contenido */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}