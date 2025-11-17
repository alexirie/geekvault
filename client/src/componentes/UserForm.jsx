// src/components/UserForm.jsx
import { useState } from "react";

export default function UserForm({ initialData = {}, onSubmit, loading, error }) {
    const [username, setUsername] = useState(initialData.username || "");
    const [email, setEmail] = useState(initialData.email || "");
    const [password, setPassword] = useState(initialData.password || "");
    const [roles, setRoles] = useState(initialData.roles || []); // array de strings
    const [enabled, setEnabled] = useState(initialData.enabled ?? true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            username,
            email,
            password,
            roles,
            enabled
        });
    };

    const handleRoleChange = (role) => {
        const roleWithPrefix = `ROLE_${role}`;
        if (roles.includes(roleWithPrefix)) {
            setRoles(roles.filter(r => r !== roleWithPrefix));
        } else {
            setRoles([...roles, roleWithPrefix]);
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}

            {/* USERNAME */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>

            {/* EMAIL */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>

            {/* PASSWORD */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!initialData.id} // obligatorio solo al crear
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>

            {/* ROLES */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Roles</label>
                <div className="flex gap-4">
                    {["ADMIN", "USER"].map(role => (
                        <label key={role} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={roles.includes(`ROLE_${role}`)}
                                onChange={() => handleRoleChange(role)}
                                className="w-5 h-5 accent-blue-500"
                            />
                            {role}
                        </label>
                    ))}
                </div>
            </div>

            {/* ENABLED */}
            <label className="flex items-center gap-2 text-gray-700">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                />
                Habilitado
            </label>

            {/* BOTÓN */}
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-3 px-5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
            >
                {loading ? "Guardando..." : "Guardar Usuario"}
            </button>
        </form>
    );
}
