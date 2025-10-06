import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

let token = "";
export function setToken(t) {
  token = t;
}

export async function login(username, password) {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);
  return axios.post(`${API_BASE}/auth/login`, form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export async function listItems() {
  return axios.get(`${API_BASE}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createItem(data) {
  return axios.post(`${API_BASE}/items`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function semanticSearch(query, k = 5) {
  return axios.post(
    `${API_BASE}/search`,
    { query, k },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
