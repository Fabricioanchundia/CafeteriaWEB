"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripePayment } from "@/components/StripePayment";
import { OrderSuccess } from "@/components/OrderSuccess";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

type PaymentMethod = "cash" | "stripe";
type Step = "summary" | "payment" | "success";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const tax = useCartStore((s) => s.getTax());
  const total = useCartStore((s) => s.getTotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash");
  const [step, setStep] = useState<Step>("summary");
  const [loading, setLoading] = useState(false);

  /* ================== EFECTIVO ================== */
  const handleCashConfirm = async () => {
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1200));

      console.log("Pedido en efectivo:", {
        items,
        subtotal,
        tax,
        total,
        paymentMethod,
      });

      clearCart();
      setStep("success");
    } catch {
      alert("Error al enviar el pedido");
    } finally {
      setLoading(false);
    }
  };

  /* ================== SUCCESS ================== */
  if (step === "success") {
    return (
      <OrderSuccess
        onBack={() => router.push("/dashboard/customers")}
      />
    );
  }

  /* ================== PAYMENT (STRIPE) ================== */
  if (step === "payment" && paymentMethod === "stripe") {
    return (
      <div className="min-h-screen bg-[#faf6f2] px-6 py-16">
        <div className="max-w-md mx-auto space-y-6">
          <button
            onClick={() => setStep("summary")}
            className="text-[#7b3f1d] hover:text-[#a85b29] font-medium"
          >
            ← Volver
          </button>

          <h1 className="text-3xl font-bold text-[#7b3f1d]">
            Pago con tarjeta
          </h1>

          <div className="bg-white rounded-3xl shadow-md p-8">
            <Elements stripe={stripePromise}>
              <StripePayment
                onSuccess={() => {
                  clearCart();
                  setStep("success");
                }}
              />
            </Elements>
          </div>
        </div>
      </div>
    );
  }

  /* ================== SUMMARY ================== */
  return (
    <div className="min-h-screen bg-[#faf6f2] px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="text-[#7b3f1d] hover:text-[#a85b29] font-medium"
        >
          ← Regresar al menú
        </button>

        <h1 className="text-3xl font-bold text-[#7b3f1d]">
          Confirmar pedido
        </h1>

        <div className="bg-white rounded-3xl shadow-md p-8 space-y-6">
          {/* ITEMS */}
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <hr />

          {/* MÉTODO DE PAGO */}
          <div className="space-y-3">
            <p className="font-semibold text-[#7b3f1d]">
              Método de pago
            </p>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              💵 Pago en efectivo (mostrador)
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              💳 Tarjeta (Stripe)
            </label>
          </div>

          <hr />

          {/* TOTALES */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (12%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#7b3f1d]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() =>
              paymentMethod === "cash"
                ? handleCashConfirm()
                : setStep("payment")
            }
            disabled={loading}
            className="w-full bg-[#c5743a] hover:bg-[#a85b29] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading
              ? "Procesando..."
              : paymentMethod === "cash"
              ? "Confirmar pedido"
              : "Continuar a pago"}
          </button>
        </div>
      </div>
    </div>
  );
}
