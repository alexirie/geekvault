// src/services/api.js

//pc 
//const BASE_URL = 'http://localhost:8080/api';

//movil
const BASE_URL = 'http://192.168.0.131:8080/api';

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
