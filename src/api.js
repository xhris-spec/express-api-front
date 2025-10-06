import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export function setToken(t) {
  localStorage.setItem("token", t);
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
  return api.get(`/items`);
}
export async function createItem(data) {
  return api.post(`/items`, data);
}
export async function semanticSearch(query, k = 5) {
  return api.post(`/search`, { query, k });
}
