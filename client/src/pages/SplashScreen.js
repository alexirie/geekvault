// src/pages/SplashScreen.js
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // pasa a la app
    }, 2500); // 2.5 segundos
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <AnimatePresence>
        <motion.img
          src="/logo.jpg" // reemplaza con tu logo
          alt="Logo"
          className="w-80 h-80 object-contain sm:w-96 sm:h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
