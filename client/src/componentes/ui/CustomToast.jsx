import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function CustomToast({ message, visible, icon }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, y: -10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="fixed top-6 right-4 z-50"
        >
          <div
            className="
              flex items-center gap-3 px-5 py-3.5 rounded-2xl 
              shadow-[0_0_25px_rgba(59,130,246,0.45)]
              bg-[#0d1117]/80 backdrop-blur-xl 
              border border-blue-500/30
              w-fit max-w-[85vw] text-blue-100
              select-none
            "
          >
            {/* LOGO */}
            <img
              src="/logoOscuro.jpg"
              alt="logo"
              className="w-9 h-9 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            />

            {/* MENSAJE */}
            <span className="font-semibold text-sm sm:text-base tracking-wide">
              {message}
            </span>

            {/* ICONO */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {icon || (
                <FaCheckCircle className="text-blue-400 text-xl drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
