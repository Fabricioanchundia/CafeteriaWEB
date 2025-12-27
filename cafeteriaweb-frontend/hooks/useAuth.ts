"use client";

import { useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message =
          typeof data?.message === "string" ? data.message : "Credenciales incorrectas";
        setError(message);
        return { success: false };
      }

      // Guarda token y role CORRECTAMENTE
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      console.error(err);
      setError(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
