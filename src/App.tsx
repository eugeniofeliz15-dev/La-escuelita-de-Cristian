import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegistroPage } from "./pages/RegistroPage";
import { useAuthStore } from "./store/useAuthStore";

// Componente placeholder para cuando el usuario inicie sesión
function InicioPlaceholder() {
  const usuario = useAuthStore((state) => state.usuario);
  const logout = useAuthStore((state) => state.logout);
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-marca-700">¡Bienvenido, {usuario?.nombre}!</h1>
      <p className="mt-2 text-slate-600">Rol: {usuario?.rol}</p>
      <button 
        onClick={logout}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        
        {/* Ruta protegida temporal (la mejoraremos en el siguiente paso) */}
        <Route path="/inicio" element={<InicioPlaceholder />} />
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;