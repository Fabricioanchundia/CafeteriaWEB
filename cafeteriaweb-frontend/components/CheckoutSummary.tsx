"use client";

import { useCartStore } from "@/stores/useCartStore";
import CheckoutItem from "./CheckoutItem";

export default function CheckoutSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const tax = useCartStore((s) => s.getTax());
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <div className="bg-white rounded-2xl border border-[#c5743a] p-6 space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>IVA (12%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg text-[#7b3f1d]">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => {
          alert("Pedido confirmado ☕ (demo)");
          clearCart();
        }}
        className="w-full bg-[#c5743a] hover:bg-[#a85b29] text-white py-3 rounded-xl font-semibold transition"
      >
        Confirmar pedido
      </button>
    </div>
  );
}
