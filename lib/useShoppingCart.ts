import { CartItem, Product } from "@/types/type";
import Stripe from "stripe";
import { useLocalStorage } from "usehooks-ts";

export function useShoppingCart() {
  const [cart, setCart] = useLocalStorage<{ lineItems: CartItem[] }>(
    "jandtmakestuff-cart",
    { lineItems: [] }
  );

  function getCartItems() {
    return cart.lineItems;
  }

  function addItemToCart(newItem: Product) {
    const itemIndex = cart.lineItems.findIndex((i) => i.id === newItem.id);
    const itemToAdd = {
      id: newItem.id,
      name: newItem.name,
      price: newItem.price,
      quantity: 1,
    };
    console.log(itemIndex, itemToAdd);
    if (itemIndex === -1)
      return setCart({ lineItems: [...cart.lineItems, itemToAdd] });
    const lineItems = [...cart.lineItems];
    lineItems[itemIndex].quantity = lineItems[itemIndex].quantity + 1;
    setCart({ lineItems: lineItems });
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
