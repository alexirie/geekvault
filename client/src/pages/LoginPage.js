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
            <div className="mb-10">
                <img
                    src="/logoOscuro.jpg"
                    alt="Logo"
                    className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-full shadow-[0_0_25px_rgba(59,130,246,0.45)] border border-blue-500/20"
                />
            </div>

            {/* Login Form */}
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm bg-[#161b22] p-6 rounded-2xl shadow-2xl border border-white/10"
            >
                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
                )}

                {/* Email input */}
                <div className="relative mb-4">
                    <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-10 py-3 rounded-xl bg-[#0d1117] text-white border border-white/10 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
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
                        className="w-full px-10 py-3 rounded-xl bg-[#0d1117] text-white border border-white/10 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-500/20 transition-all duration-200"
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
        </div>
    );
}
