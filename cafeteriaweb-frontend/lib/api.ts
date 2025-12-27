import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // 🔥 API Gateway
  headers: {
    "Content-Type": "application/json",
  },
});

// ---- LOGIN ----
export async function loginRequest(email: string, password: string) {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Credenciales incorrectas"
    );
  }
}
