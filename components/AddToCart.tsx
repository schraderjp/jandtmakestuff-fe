'use client';

import React from 'react';
import { Button } from './ui/button';
import { Product } from '@/types/type';
import { useCart } from '@/lib/useCart';

const AddToCart = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  return (
    <Button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          totalPrice: product.price,
        })
      }
      variant={'default'}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCart;
