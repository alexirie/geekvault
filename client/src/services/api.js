// src/services/api.js
import { BASE_URL, BASE_URL_L } from '../constantes';

export const getFigures = async () => {
  const res = await fetch(`${BASE_URL}/figures`);
  if (!res.ok) throw new Error('Error fetching figures');
  return res.json();
};

export const getFigureById = async (id) => {
  const res = await fetch(`${BASE_URL}/figures/${id}`);
  if (!res.ok) throw new Error('Error fetching figure');
  return res.json();
};

// ---------------------
// ✅ LOGIN
// ---------------------
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL_L}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  console.log("Status:", res.status);
  console.log("Headers:", [...res.headers]);
  const text = await res.text();
  console.log("Body:", text);

  if (!res.ok) {
    const errorText = await res.text(); // leer error del backend
    throw new Error(errorText || "Usuario o contraseña invalidos");
  }

  return res.json(); // { accessToken, refreshToken }
};

// ---------------------
// ✅ REGISTER
// ---------------------
export const register = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error en registro");
  }

  return res.json(); // si tu backend devuelve algo
};