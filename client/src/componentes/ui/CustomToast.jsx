import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function CustomToast({ message, visible, icon }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-6 right-4 z-50"
        >
          <div className="
              flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl
              bg-white/90 backdrop-blur-md border border-gray-200
              w-fit max-w-[85vw] text-gray-800 select-none
            "
          >
            {/* LOGO */}
            <img 
              src="/logo-dibujo.jpg"
              alt="logo"
              className="w-8 h-8 rounded-full shadow-md"
            />

            {/* TEXTO */}
            <span className="font-medium text-sm sm:text-base">
              {message}
            </span>

            {/* ICONO */}
            {icon || <FaCheckCircle className="text-green-500 text-xl" />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
