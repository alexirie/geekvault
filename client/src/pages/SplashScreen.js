// src/pages/SplashScreen.js
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../componentes/LoadingSpinner";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // pasa a la app
    }, 2500); // 2.5 segundos
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
  <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0d1117] px-4">

    <LoadingSpinner>
      <motion.img
        src="/logoOscuro.jpg" 
        alt="Logo"
        className="w-56 h-56 sm:w-72 sm:h-72 object-contain mb-10 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.15 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </LoadingSpinner>

  </div>
);

};

export default SplashScreen;
