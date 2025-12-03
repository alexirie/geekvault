import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../componentes/UserForm";
import { motion } from "framer-motion";
import { createUser } from "../services/api";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        setLoading(true);
        setError("");

        try {
            await createUser(data); 

            navigate("/login");
        } catch (err) {
            setError(err.message || "Error al registrar el usuario");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0d1117] px-4">

            {/* LOGO ANIMADO */}
            <motion.img
                src="/logoOscuro.jpg"
                alt="Logo"
                className="w-52 h-52 mb-8 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
            />

            {/* TITULO */}
            <motion.h1
                className="text-3xl font-bold text-blue-300 mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Crear Cuenta
            </motion.h1>

            {/* FORMULARIO */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-md"
            >
                <UserForm
                    initialData={{}}
                    onSubmit={handleRegister}
                    loading={loading}
                    error={error}
                />
            </motion.div>

            {/* YA TIENES CUENTA */}
            <p className="mt-6 text-blue-300 text-sm">
                ¿Ya tienes cuenta?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="text-blue-400 font-semibold cursor-pointer hover:underline"
                >
                    Iniciar sesión
                </span>
            </p>
        </div>
    );
}
