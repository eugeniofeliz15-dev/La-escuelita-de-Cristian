import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegistroPage } from "./pages/RegistroPage";
import { InicioPage } from "./pages/InicioPage";
import { CursosPage } from "./pages/CursosPage";
import { CursoDetallePage } from "./pages/CursoDetallePage";
import { InscripcionesPage } from "./pages/InscripcionesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Layout } from "./components/Layout";
import { RutaProtegida } from "./components/RutaProtegida";
import { useAuthStore } from "./store/useAuthStore";

// Componente inteligente para la ruta raíz
function Raiz() {
  const token = useAuthStore((s) => s.token);
  // Si ya está logueado → va al inicio, si no → va al login
  return <Navigate to={token ? "/inicio" : "/login"} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Ruta raíz: redirige inteligentemente */}
        <Route path="/" element={<Raiz />} />

        {/* Rutas públicas (sin layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        {/* Rutas protegidas (con layout + sidebar) */}
        <Route
          path="/inicio"
          element={
            <RutaProtegida>
              <Layout>
                <InicioPage />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/cursos"
          element={
            <RutaProtegida>
              <Layout>
                <CursosPage />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/cursos/:id"
          element={
            <RutaProtegida>
              <Layout>
                <CursoDetallePage />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/inscripciones"
          element={
            <RutaProtegida>
              <Layout>
                <InscripcionesPage />
              </Layout>
            </RutaProtegida>
          }
        />

        {/* 404: solo para rutas inexistentes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;