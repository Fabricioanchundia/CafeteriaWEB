import axios from "axios";

export const dashboardApi = axios.create({
  baseURL: "http://localhost:3000", // API GATEWAY
});

// Token automático solo para dashboard
dashboardApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default dashboardApi;