import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// ⬆️ SIN apiVersion (esto soluciona el error ts2322)

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("❌ Stripe error:", error);
    return NextResponse.json(
      { error: "Error creando PaymentIntent" },
      { status: 500 }
    );
  }
}
