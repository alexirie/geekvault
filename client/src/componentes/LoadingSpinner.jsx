import { motion } from "framer-motion";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0d1117] gap-6">

            {/* Circle wrapper with centered logo */}
            <div className="relative w-48 h-48 flex items-center justify-center -mt-8">

                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.4)]" />

                {/* Rotating gradient arc */}
                <motion.div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                >
                    <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>

                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "conic-gradient(from 180deg, rgba(59,130,246,0.0), rgba(59,130,246,0.28), rgba(147,197,253,0.18))",
                                transform: "scale(1.02)",
                                borderRadius: "9999px",
                                mixBlendMode: "screen",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Larger logo */}
                <motion.img
                    src="/logoOscuro.jpg"
                    alt="Logo"
                    className="w-36 h-36 object-cover rounded-full shadow-[0_0_25px_rgba(59,130,246,0.55)] border border-blue-500/20"
                    initial={{ scale: 0.9, opacity: 0.9 }}
                    animate={{ scale: [0.97, 1.04, 0.97] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.p
                className="text-lg text-blue-300 font-medium tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Cargando waifus...
            </motion.p>

        </div>
    );
}
