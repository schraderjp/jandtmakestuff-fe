"use server";

import stripe from "@/config/stripe";
import { CartItem } from "@/types/type";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function initiateCheckout(cartItems: CartItem[] | undefined) {
  let session: Stripe.Checkout.Session;
  const lineItems = cartItems?.map((i) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: i.name,
        tax_code: "txcd_99999999",
      },
      unit_amount_decimal: String(i.price * 100),
    },
    quantity: i.quantity,
  }));

  try {
    session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.ORIGIN}/checkout-success`,
      cancel_url: `${process.env.ORIGIN}/`,
      automatic_tax: { enabled: true },
    });
    if (session) redirect(session.url as string);
  } catch (error) {
    throw error;
  }
}
