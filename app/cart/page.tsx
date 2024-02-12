'use client';

import React from 'react';
import { useSanityCart } from '@/lib/useSanityCart';

const Cart = () => {
  const { sanityCart, setSanityCart } = useSanityCart();
  return (
    <div>
      <p>Cart Items: {JSON.stringify(sanityCart?.shopping_cart)}</p>
      <button>Add Item</button>
      <br></br>
      <button>Remove Item</button>
    </div>
  );
};

export default Cart;
