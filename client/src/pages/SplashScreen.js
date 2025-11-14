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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
  <AnimatePresence>
    <motion.img
      src="/logo.jpg"
      alt="Logo"
      className="w-96 h-96 sm:w-96 sm:h-96 object-contain mb-40"
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
