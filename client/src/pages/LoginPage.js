import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Envelope, Lock } from "phosphor-react";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await login(email, password);

            authContext.login(res.user, res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            localStorage.setItem("user", JSON.stringify(res.user));

            navigate("/");
        } catch (err) {
            setError(err.message || "Email o contraseña incorrectos");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#0d1117] px-4">

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-10"
            >
                <img
                    src="/logoOscuro.jpg"
                    alt="Logo"
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full object-contain
                               shadow-[0_0_30px_rgba(59,130,246,0.45)]
                               border border-blue-500/20"
                />
            </motion.div>

            {/* CONTENEDOR ANIMADO */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-sm"
            >
                {/* AURA EFECTO ANIMADO */}
                <div className="absolute inset-0 rounded-2xl 
                                bg-gradient-to-r from-blue-500/40 via-blue-400/20 to-blue-500/40 
                                blur-xl opacity-70 animate-pulse">
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleLogin}
                    className="
                        relative z-10 w-full
                        bg-[#161b22]/90 backdrop-blur-xl 
                        p-6 rounded-2xl border border-blue-500/20 shadow-2xl
                    "
                >
                    {error && (
                        <p className="text-red-400 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )}

                    {/* Email input */}
                    <div className="relative mb-4">
                        <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                w-full px-10 py-3 rounded-xl bg-[#0d1117] text-white 
                                border border-blue-500/20 shadow-inner
                                focus:ring-2 focus:ring-blue-500 outline-none 
                                placeholder-gray-400
                            "
                            required
                        />
                    </div>

                    {/* Password input */}
                    <div className="relative mb-6">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                w-full px-10 py-3 rounded-xl bg-[#0d1117] text-white 
                                border border-blue-500/20 shadow-inner
                                focus:ring-2 focus:ring-blue-500 outline-none 
                                placeholder-gray-400
                            "
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full py-3 bg-blue-600 text-white font-semibold rounded-xl 
                            shadow-lg hover:bg-blue-700 hover:shadow-blue-500/20 
                            transition-all duration-200
                        "
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>

                    <p className="mt-4 text-center text-gray-400 text-sm">
                        ¿No tienes cuenta?{" "}
                        <span
                            className="text-blue-400 cursor-pointer hover:underline"
                            onClick={() => navigate("/register")}
                        >
                            Regístrate
                        </span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
