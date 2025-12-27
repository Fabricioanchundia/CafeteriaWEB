"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCartStore } from "@/stores/useCartStore";

export function StripePayment({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const total = useCartStore((s) => s.getTotal());

  const handlePay = async () => {
    if (!stripe || !elements) {
      alert("Stripe todavía no está listo. Intenta de nuevo en unos segundos.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      alert("No se pudo leer la tarjeta. Intenta de nuevo.");
      return;
    }

    const res = await fetch("/api/stripe/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });

    if (!res.ok) {
      alert("No se pudo crear el intento de pago.");
      return;
    }

    const { clientSecret } = (await res.json()) as { clientSecret: string };

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      }
    );

    if (error) {
      alert(error.message ?? "Pago fallido");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      onSuccess();
    } else {
      alert("Pago fallido");
    }
  };

  return (
    <div className="space-y-4">
      <CardElement />
      <button
        onClick={handlePay}
        disabled={!stripe || !elements}
        className="w-full bg-[#c5743a] hover:bg-[#a85b29] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
      >
        Pagar ahora
      </button>
    </div>
  );
}
