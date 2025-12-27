'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { loginRequest } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginRequest(email, password);

      // Guardar token y rol
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role);

      // Redirección según rol
      if (data.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/customers');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);

      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Credenciales incorrectas';

      setError(message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-neutral-900 relative"
      style={{
        backgroundImage:
          "url('/images/assets/background/background-login-urbanroast.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <div className="max-w-md w-full bg-[#f5f1ee]/95 rounded-3xl shadow-lg p-8 sm:p-10 border border-orange-100/60">

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
            Iniciar Sesión
          </h1>

          {error && (
            <p className="text-center text-red-600 text-sm mb-3">
              {error}
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu_correo@ejemplo.com"
                className="w-full rounded-xl border border-[#d9b9a0] bg-white px-4 py-2.5 text-sm text-neutral-900"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#d9b9a0] bg-white px-4 py-2.5 text-sm text-neutral-900"
                required
              />
            </div>

            {/* RECORDAR */}
            <div className="flex items-center justify-between text-sm text-neutral-700 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4"
                />
                <span>Recordar usuario</span>
              </label>

              <button
                type="button"
                className="text-[#c5743a] hover:text-[#a85b29] font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* BOTÓN LOGIN */}
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-[#c5743a] hover:bg-[#a85b29] text-white font-semibold py-2.5 text-sm"
            >
              Entrar
            </button>
          </form>

          {/* REGISTRO */}
          <p className="mt-6 text-center text-sm text-neutral-700">
            ¿No tienes cuenta?{' '}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="text-[#c5743a] hover:text-[#a85b29] font-semibold"
            >
              Regístrate
            </button>
          </p>

          <p className="mt-3 text-center text-xs text-neutral-500">
            Bienvenido a <span className="font-semibold">Café Urban Roast</span>
          </p>
        </div>
      </div>
    </div>
  );
}
