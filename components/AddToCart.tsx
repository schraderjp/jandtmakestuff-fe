'use client';

import React, { KeyboardEvent, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CartItem, Product } from '@/types/type';
import { useCart } from '@/lib/useCart';
import { Minus, Plus, Trash } from 'lucide-react';
import { Input } from './ui/input';
import QuantityInput from './QuantityInput';
import { useSanityCart } from '@/lib/useSanityCart';

const AddToCart = ({ product }: { product: Product }) => {
  const { addItem, inCart, getItem, updateItemQuantity, items } = useCart();
  //
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState('');
  const { addItem: addSanityItem, testFunction } = useSanityCart();
  useEffect(() => {
    if (!inCart(product.id)) {
      setIsInCart(false);
      return;
    }
    setIsInCart(true);
  }, [items]);
  return (
    <div>
      <button onClick={() => testFunction()}>Test Function</button>
      {isInCart && getItem(product.id) ? (
        <QuantityInput cartItem={getItem(product.id) as CartItem} />
      ) : (
        <Button
          className="text-lg  h-10 "
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
      )}
      {isInCart && getItem(product.id) ? (
        <QuantityInput cartItem={getItem(product.id) as CartItem} />
      ) : (
        <Button
          className="text-lg  h-10 "
          onClick={() =>
            addSanityItem({
              id: product.id,
              name: product.name,
              quantity: 1,
              price: product.price,
              totalPrice: product.price,
            })
          }
          variant={'default'}
        >
          Add to Sanity Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
