'use server';

import stripe from '@/config/stripe';
import { CartItem } from '@/types/type';
import { validateCart } from './validateCart';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { getProducts } from '@/app/utils/sanityConfig';

export async function initiateCheckout(cartItems: CartItem[] | undefined) {
  if (cartItems === undefined)
    throw new Error('No cart items submitted for checkout.');
  let session: Stripe.Checkout.Session;
  const products = await getProducts();
  const validatedCartItems = validateCart(products, cartItems);
  const lineItems = validatedCartItems?.map((i) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: i.name,
        tax_code: 'txcd_99999999',
      },
      unit_amount_decimal: String(i.price * 100),
    },
    quantity: i.quantity,
  }));

  try {
    session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.ORIGIN}/checkout-success`,
      cancel_url: `${process.env.ORIGIN}/`,
      automatic_tax: { enabled: true },
    });
    if (session) redirect(session.url as string);
  } catch (error) {
    throw error;
  }
}
