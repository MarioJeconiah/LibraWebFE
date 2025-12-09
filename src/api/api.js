import axios from "axios";

const api = axios.create({
  baseURL: "https://librawebapi-production.up.railway.app",
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;