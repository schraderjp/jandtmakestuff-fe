import React from 'react';
import { Button } from './ui/button';
import { useCart } from '@/lib/useCart';
import { initiateCheckout } from '@/lib/actions';
import CartItemsList from '../components/CartItemsList';

const CartContent = () => {
  const { items } = useCart();
  const initiateCheckoutWithData = initiateCheckout.bind(null, items);
  return (
    <>
      <CartItemsList />
      <form action={initiateCheckoutWithData}>
        <Button type="submit" id="checkout-button">
          Checkout
        </Button>
      </form>
    </>
  );
};

export default CartContent;
