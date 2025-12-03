import { useState } from "react";

export default function UserForm({ initialData = {}, onSubmit, loading, error }) {
    const [username, setUsername] = useState(initialData.username || "");
    const [email, setEmail] = useState(initialData.email || "");
    const [password, setPassword] = useState(initialData.password || "");
    const [enabled, setEnabled] = useState(initialData.enabled ?? true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            username,
            email,
            password,
            roles: ["ROLE_USER"],
            enabled: true
        });
    };

    return (
        <form
            className="
                flex flex-col gap-6 p-6 rounded-2xl 
                bg-[#0d1117] border border-blue-500/20 
                shadow-[0_0_25px_rgba(59,130,246,0.15)]
            "
            onSubmit={handleSubmit}
        >

            {/* ERROR */}
            {error && (
                <p className="text-red-400 bg-red-900/30 border border-red-500/20 p-3 rounded-xl text-sm">
                    {error}
                </p>
            )}

            {/* USERNAME */}
            <div className="flex flex-col gap-1">
                <label className="text-blue-300 font-medium tracking-wide text-sm">
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="
                        w-full p-3 rounded-xl bg-[#0f1620] text-blue-100
                        border border-blue-500/20
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        shadow-inner shadow-black/40
                    "
                />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1">
                <label className="text-blue-300 font-medium tracking-wide text-sm">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="
                        w-full p-3 rounded-xl bg-[#0f1620] text-blue-100
                        border border-blue-500/20
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        shadow-inner shadow-black/40
                    "
                />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1">
                <label className="text-blue-300 font-medium tracking-wide text-sm">
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!initialData.id}
                    className="
                        w-full p-3 rounded-xl bg-[#0f1620] text-blue-100
                        border border-blue-500/20
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        shadow-inner shadow-black/40
                    "
                />
            </div>


            {/* BOTÓN */}
            <button
                type="submit"
                disabled={loading}
                className="
                    bg-blue-600/90 hover:bg-blue-500
                    text-white py-3 px-5 rounded-xl text-lg font-semibold
                    shadow-[0_0_20px_rgba(59,130,246,0.5)]
                    transition disabled:bg-blue-300 disabled:shadow-none
                "
            >
                {loading ? "Guardando..." : "Guardar Usuario"}
            </button>
        </form>
    );
}
