"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import dashboardApi from "@/lib/dashboardApi";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await dashboardApi.post("/auth/register", {
        username,
        email,
        password,
        role: "customer", // 🔐 IMPORTANTE
      });

      // Al registrarse correctamente → login
      router.push("/login");
    } catch (err: any) {
      console.error("Register error:", err);
      setError("El usuario ya existe o los datos son inválidos");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-neutral-900 relative"
      style={{
        backgroundImage:
          "url('/images/assets/background/background-login-urbanroast.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 w-full max-w-md bg-[#f5f1ee]/95 rounded-3xl shadow-lg p-8 border border-orange-100/60">
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/assets/logo/logo-urbanroast-2.png"
            alt="Café Urban Roast"
            width={140}
            height={140}
            className="rounded-xl shadow-md"
          />
        </div>

        <h1 className="text-center text-2xl font-semibold text-[#7b3f1d] mb-4">
          Crear cuenta
        </h1>

        {error && (
          <p className="text-center text-red-600 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* USERNAME */}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            className="w-full rounded-xl border border-[#d9b9a0] bg-white px-4 py-2.5 text-sm"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full rounded-xl border border-[#d9b9a0] bg-white px-4 py-2.5 text-sm"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-xl border border-[#d9b9a0] bg-white px-4 py-2.5 text-sm"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#c5743a] hover:bg-[#a85b29] text-white font-semibold py-2.5 text-sm"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-700">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-[#c5743a] hover:text-[#a85b29] font-semibold"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
