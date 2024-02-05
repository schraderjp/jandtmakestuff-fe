import Stripe from 'stripe';
import { useLocalStorage } from 'usehooks-ts';

export function useShoppingCart() {
  const [cart, setCart] = useLocalStorage<{ lineItems: Stripe.Product[] }>(
    'jandtmakestuff-cart',
    { lineItems: [{ id: 'asdfasdf', active: true }] }
  );

  function getCartItems() {
    return cart.lineItems;
  }

  function addItemToCart(newItem: Stripe.Product) {
    setCart({ lineItems: [...cart.lineItems, newItem] });
  }

  function removeItemFromCart(id: string) {
    const currentItems = cart.lineItems;
    const updatedItems = currentItems.filter((i) => i.id !== id);
    setCart({ lineItems: updatedItems });
  }

  function clearCartItems() {
    setCart({ lineItems: [] });
  }

  return { getCartItems, addItemToCart, removeItemFromCart, clearCartItems };
}
