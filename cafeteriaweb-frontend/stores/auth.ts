import { create } from "zustand";
import { api } from "@/lib/api";

interface AuthState {
  token: string | null;
  user: any | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,

  // Login al API-Gateway -> auth-service
  login: async (email, password) => {
    try {
      const resp = await api.post("/auth/login", { email, password });

      set({
        token: resp.data.token,
        user: resp.data.user,
      });

      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  },

  logout: () => {
    set({ token: null, user: null });
  },
}));
