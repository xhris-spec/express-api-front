import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

let memToken = localStorage.getItem("token") || "";
export const setToken = (t) => {
  memToken = t || "";
  t ? localStorage.setItem("token", t) : localStorage.removeItem("token");
};
export const getToken = () => memToken;

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  if (memToken) config.headers.Authorization = `Bearer ${memToken}`;
  const cid = crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());
  config.headers["x-correlation-id"] = cid;
  console.debug("[HTTP] →", config.method?.toUpperCase(), config.url, { cid });
  return config;
});

api.interceptors.response.use(
  (resp) => {
    const cid = resp.config.headers["x-correlation-id"];
    console.debug("[HTTP] ←", resp.status, resp.config.url, { cid });
    return resp;
  },
  (err) => {
    const cfg = err?.config || {};
    const cid = cfg.headers?.["x-correlation-id"];
    console.error("[HTTP] ×", cfg.method?.toUpperCase(), cfg.url, { cid, err: err.message });
    return Promise.reject(err);
  }
);

export const listItems = () => api.get("/items");
export const createItem = (body) => api.post("/items", body);
export const semanticSearch = (q, k=5) => api.post("/search", { query: q, k });

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

export default api;
