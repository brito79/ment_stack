import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// in production, there's no localhost so we have to make this dynamic

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;