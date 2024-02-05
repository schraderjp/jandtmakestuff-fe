import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/config/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  // const { lineItems } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Keychain",
              description: "Keychain",
              tax_code: "txcd_99999999",
            },
            unit_amount_decimal: "500",
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${headersList.get("origin")}/success`,
      cancel_url: `${headersList.get("origin")}/`,
      automatic_tax: { enabled: true },
    });
    return NextResponse.redirect(new URL(session.url as string), {
      status: 303,
    });
    // return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}
