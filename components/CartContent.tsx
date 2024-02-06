import React from 'react';
import { Button } from './ui/button';
import { useShoppingCart } from '@/lib/useShoppingCart';
import { initiateCheckout } from '@/lib/actions';
import CartItemsList from '../components/CartItemsList';

const CartContent = () => {
  const { cartItems, addItemToCart } = useShoppingCart();
  const initiateCheckoutWithData = initiateCheckout.bind(null, cartItems);
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
