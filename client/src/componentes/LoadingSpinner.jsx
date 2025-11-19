import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 gap-6 mt-20">
      {/* Circle wrapper with logo centered */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Subtle outer glow ring */}
        <div className="absolute inset-0 rounded-full shadow-[0_10px_30px_rgba(99,102,241,0.12)]" />

        {/* Rotating gradient arc (spinner) */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        >
          {/* Base ring (faint) */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200/40"></div>

       
          {/* Optional faint gradient overlay to make it look modern */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "conic-gradient(from 180deg, rgba(99,102,241,0.0), rgba(99,102,241,0.12), rgba(236,72,153,0.08))",
                transform: "scale(1.02)",
                borderRadius: "9999px",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </motion.div>

        {/* Logo centered inside the circle */}
        <motion.img
          src="/logo.jpg"
          alt="Logo"
          className="w-28 h-28 object-cover rounded-full shadow-xl z-10 border border-white/20"
          initial={{ scale: 0.9, opacity: 0.9 }}
          animate={{ scale: [0.98, 1.02, 0.98], rotate: [0, 2, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <p className="text-lg text-gray-700 font-medium tracking-wide">Cargando waifus...</p>
    </div>
  );
}
