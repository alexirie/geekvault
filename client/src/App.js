// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import FigureDetail from './pages/FigureDetail'; // opcional

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Otras rutas */}
        {/* <Route path="/figure/:id" element={<FigureDetail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
