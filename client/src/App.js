// src/App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FigureDetail from './pages/FigureDetail';
import { App as CapacitorApp } from "@capacitor/app";
import SplashScreen from "./pages/SplashScreen";
import LoginPage from './pages/LoginPage';

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
        <Route path="/" element={<LoginPage />} />
        {/* Otras rutas */}
        <Route path="/figure/:id" element={<FigureDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
