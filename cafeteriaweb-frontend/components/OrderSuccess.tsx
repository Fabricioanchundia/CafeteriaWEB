"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export function OrderSuccess({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#c5743a", "#7b3f1d", "#f5e6dc"],
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f2] px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full space-y-6"
      >
        {/* CHECK */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 rounded-full bg-[#c5743a] flex items-center justify-center"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <h2 className="text-3xl font-bold text-[#7b3f1d]">
          ¡Pedido enviado!
        </h2>

        <p className="text-gray-600">
          Tu pedido fue recibido correctamente y ya está en preparación.
        </p>

        <button
          onClick={onBack}
          className="w-full bg-[#c5743a] hover:bg-[#a85b29] text-white py-3 rounded-xl font-semibold transition"
        >
          Volver al menú
        </button>
      </motion.div>
    </div>
  );
}
