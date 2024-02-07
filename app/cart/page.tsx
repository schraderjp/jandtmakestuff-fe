'use client';

import React from 'react';
import { useCart } from '@/lib/useCart';

const Cart = () => {
  const item = {
    id: Math.floor(Math.random()).toString(),
    name: 'keychain',
    price: 5,
    quantity: 1,
    totalPrice: 5,
  };
  const { items, addItem, removeItem } = useCart();
  return (
    <div>
      <p>Cart Items: {JSON.stringify(items)}</p>
      <button onClick={() => addItem(item)}>Add Item</button>
      <br></br>
      <button onClick={() => removeItem(item.id)}>Remove Item</button>
    </div>
  );
};

export default Cart;
