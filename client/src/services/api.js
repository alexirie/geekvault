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
// LOGIN
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


  if (!res.ok) {
    const errorText = await res.text(); // leer error del backend
    throw new Error(errorText || "Usuario o contraseña invalidos");
  }
  return res.json();
};

// ---------------------
// REGISTER
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

// ---------------------
// CREATE FIGURE
// ---------------------
export const createFigure = async (name, brandId, price, inStock, imageUrl, anime, collection, description) => {

  const res = await fetch(`${BASE_URL}/figures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name,
      brandId,
      price: parseFloat(price),
      inStock,
      imageUrl,
      anime,
      collection,
      description,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error al crear la figura");
  }

  return res.json();
}
