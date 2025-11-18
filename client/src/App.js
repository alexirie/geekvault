// src/App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FigureDetail from './pages/FigureDetail';
import { App as CapacitorApp } from "@capacitor/app";
import SplashScreen from "./pages/SplashScreen";
import LoginPage from './pages/LoginPage';
import AdminLayout from "./componentes/AdminLayout";
import ProtectedRoute from "./componentes/ProtectedRoute";
import Dashboard from './pages/admin/Dashboard';
import PublicRoute from './componentes/PublicRoute';
import FiguresList from './pages/admin/figures/FigureList';
import NewFigure from './pages/admin/figures/NewFigure';
import EditFigure from './pages/admin/figures/EditFigure';
import UserList from './pages/admin/users/UserList';
import NewUser from './pages/admin/users/NewUser';
import StockList from './pages/admin/stock/StockList';
import NewStock from './pages/admin/stock/NewStock';
import EditStock from './pages/admin/stock/EditStock';

function App() {

  function BackButtonHandler() {
    const navigate = useNavigate();

    useEffect(() => {
      CapacitorApp.addListener("backButton", () => {
        if (window.location.pathname === "/") {
          CapacitorApp.exitApp(); // salir de la app
        } else {
          window.history.back(); // navegar atrás
        }
      });
    }, [navigate]);

    return null; // este componente no renderiza nada
  }

  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      {/* Manejador del botón atrás dentro del Router */}
      <BackButtonHandler />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Otras rutas */}
        <Route path="/figure/:id" element={<FigureDetail />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Rutas admin protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} /> {/* Esta es la página por defecto */}
            {/* FIGURAS */}
            <Route path="figuras" element={<FiguresList />} />
            <Route path="figuras/nueva" element={<NewFigure />} />
            <Route path="figuras/:id/editar" element={<EditFigure />} />

            {/* STOCK */}
            <Route path="stock" element={<StockList />} />
            <Route path="stock/nuevo" element={<NewStock />} />
            <Route path="stock/:id/editar" element={<EditStock />} />

            {/* USUARIOS */}
            <Route path="usuarios" element={<UserList />} />
            <Route path="usuarios/nuevo" element={<NewUser />} />
            {/* más rutas admin hijas aquí */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
