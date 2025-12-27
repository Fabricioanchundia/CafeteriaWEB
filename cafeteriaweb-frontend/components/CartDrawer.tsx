"use client";

import { useCartStore } from "@/stores/useCartStore";
import { CheckoutFooter } from "./CheckoutFooter";

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="fixed right-4 bottom-4 w-80 bg-white rounded-2xl shadow-xl border border-[#c5743a] p-4 z-50">
      <h3 className="font-bold text-[#7b3f1d] mb-3">🛒 Tu pedido</h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Carrito vacío</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  x{item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* ⬇️ AQUÍ VA EL FOOTER */}
          <CheckoutFooter />
        </div>
      )}
    </div>
  );
}
