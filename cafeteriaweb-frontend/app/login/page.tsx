"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/assets/background/background-login-urbanroast.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-[#f4f4f4]/90 p-10 rounded-xl shadow-xl w-[420px] backdrop-blur-md">
        
        {/* LOGO */}
        <div className="w-full flex justify-center mb-6">
          <Image
            src="/images/assets/logo/logo-urbanroast-2.png"
            alt="Café Urban Roast"
            width={140}
            height={140}
            className="drop-shadow-md"
          />
        </div>

        <h2 className="text-center text-2xl font-semibold text-[#5c3d31] mb-6">
          Iniciar Sesión
        </h2>

        {/* FORM */}
        <form className="space-y-5">
          
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-md border border-[#c7a28a] bg-white/90 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-md border border-[#c7a28a] bg-white/90 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#c57a4a] hover:bg-[#b56a3c] text-white font-semibold py-3 rounded-md transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Bienvenido a <span className="font-semibold text-[#5c3d31]">Café Urban Roast</span>
        </p>
      </div>
    </div>
  );
}
