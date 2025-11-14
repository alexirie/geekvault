// src/pages/LoginPage.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Envelope, Lock } from "phosphor-react";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setIsLogged } = useContext(AuthContext);
    const authContext = useContext(AuthContext);


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await login(email, password);

            // Guardar tokens
            authContext.login(res.user, res.accessToken);
           
            // Redirigir a HomePage
            navigate("/");
        } catch (err) {
            // Mostrar error del backend o mensaje por defecto
            setError(err.message || "Email o contraseña incorrectos");
        }

        setLoading(false);
    };


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
            {/* Logo */}
            <div className="mb-10 animate-pulse">
                <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-72 h-72 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain"
                />
            </div>

            {/* Login Form */}
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm bg-gray-200 p-6 rounded-2xl shadow-xl"
            >


                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                {/* Email input */}
                <div className="relative mb-4">
                    <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-10 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        required
                    />
                </div>

                {/* Password input */}
                <div className="relative mb-6">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-10 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition-colors"
                >
                    {loading ? "Cargando..." : "Iniciar sesión"}
                </button>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    ¿No tienes cuenta?{" "}
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Regístrate
                    </span>
                </p>
            </form>
        </div>
    );
}
