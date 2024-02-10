'use client';

import { useCart } from '@/lib/useCart';
import React, { useEffect } from 'react';

const Success = () => {
  const { clearCart, items } = useCart();
  useEffect(() => {
    if (!items) return;
    clearCart();
    console.log('Cart cleared.');
  }, [items, clearCart]);
  return <div>Success</div>;
};

export default Success;
