// src/pages/admin/NewUser.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/api"; // asegúrate de tener la función createUser
import UserForm from "../../../componentes/UserForm";

export default function NewUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setLoading(true);
        setError("");

        try {
            await createUser({
                username: data.username,
                email: data.email,
                password: data.password,
                roles: data.roles, // array de strings ["ADMIN", "USER"]
                enabled: data.enabled,
            });
            navigate("/admin/usuarios");
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Nuevo Usuario
                </h1>

                <UserForm onSubmit={handleSubmit} loading={loading} error={error} />
            </div>
        </div>
    );
}
