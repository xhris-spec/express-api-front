import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

let memToken = localStorage.getItem("token") || "";
export function setToken(t) {
  memToken = t || "";
  if (t) localStorage.setItem("token", t);
  else localStorage.removeItem("token");
}
export function getToken() {
  return memToken;
}

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  if (memToken) config.headers.Authorization = `Bearer ${memToken}`;
  return config;
});

export async function login(username, password) {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);
  const { data } = await axios.post(`${API_BASE}/auth/login`, form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  setToken(data.access_token);
  return data;
}

export const listItems = () => api.get("/items");
export const createItem = (body) => api.post("/items", body);
export const semanticSearch = (query, k = 5) =>
  api.post("/search", { query, k });
