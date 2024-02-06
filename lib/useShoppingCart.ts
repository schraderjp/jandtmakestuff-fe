import { CartItem, Product } from '@/types/type';
import Stripe from 'stripe';
import { useLocalStorage } from 'usehooks-ts';

export function useShoppingCart() {
  const [cart, setCart] = useLocalStorage<{ lineItems: CartItem[] }>(
    'jandtmakestuff-cart',
    { lineItems: [] },
    { initializeWithValue: false }
  );

  function getCartItems() {
    return cart?.lineItems;
  }

  const cartItems = getCartItems();

  function addItemToCart(newItem: Product) {
    if (typeof cart === 'undefined') return console.log('Cart not available');
    const itemIndex = cart?.lineItems.findIndex((i) => i.id === newItem.id);
    const itemToAdd = {
      id: newItem.id,
      name: newItem.name,
      price: newItem.price,
      quantity: 1,
    };
    if (itemIndex === -1)
      return setCart({ lineItems: [...cart?.lineItems, itemToAdd] });
    const lineItems = [...cart.lineItems];
    lineItems[itemIndex].quantity = lineItems[itemIndex].quantity + 1;
    setCart({ lineItems: lineItems });
  }

  function removeItemFromCart(id: string) {
    if (typeof cart === 'undefined') return console.log('Cart not available');
    const currentItems = cart.lineItems;
    const updatedItems = currentItems.filter((i) => i.id !== id);
    setCart({ lineItems: updatedItems });
  }

  function clearCartItems() {
    setCart({ lineItems: [] });
  }

  return { cartItems, addItemToCart, removeItemFromCart, clearCartItems };
}
