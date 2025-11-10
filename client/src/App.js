// src/App.js
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FigureDetail from './pages/FigureDetail';
import { App as CapacitorApp } from "@capacitor/app";


function App() {

  function BackButtonHandler() {
    const navigate = useNavigate();

    useEffect(() => {
      CapacitorApp.addListener("backButton", () => {
        if (window.location.pathname === "/") {
          CapacitorApp.exitApp(); // salir de la app
        } else {
          navigate(-1); // navegar atrás
        }
      });
    }, [navigate]);

    return null; // este componente no renderiza nada
  }

  return (
    <Router>
      {/* Manejador del botón atrás dentro del Router */}
      <BackButtonHandler />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Otras rutas */}
        <Route path="/figure/:id" element={<FigureDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
