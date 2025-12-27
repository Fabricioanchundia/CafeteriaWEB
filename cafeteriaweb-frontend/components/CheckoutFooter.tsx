"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";

export function CheckoutFooter() {
  const router = useRouter();

  const subtotal = useCartStore((s) => s.getSubtotal());
  const tax = useCartStore((s) => s.getTax());
  const total = useCartStore((s) => s.getTotal());
  const items = useCartStore((s) => s.items);

  if (items.length === 0) return null;

  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>IVA (12%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold text-lg text-[#7b3f1d]">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="w-full mt-3 bg-[#c5743a] hover:bg-[#a85b29] text-white py-2 rounded-xl font-semibold transition"
      >
        Ir a pagar
      </button>
    </div>
  );
}
