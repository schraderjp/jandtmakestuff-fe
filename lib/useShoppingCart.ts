import { CartItem, Product } from "@/types/type";
import { useCartContext } from "@/providers/CartProvider";

export function useShoppingCart() {
  const { cart, setCart } = useCartContext();

  function updateSubtotal(lineItems: CartItem[]) {
    let newSubtotal: number = 0;
    lineItems.forEach((item) => {
      newSubtotal += item.price;
    });
    console.log(newSubtotal);
    return newSubtotal;
  }

  function addItemToCart(newItem: Product) {
    if (typeof cart === "undefined") return console.log("Cart not available");
    const itemIndex = cart?.lineItems.findIndex((i) => i.id === newItem.id);
    const itemToAdd = {
      id: newItem.id,
      name: newItem.name,
      price: newItem.price,
      quantity: 1,
    };
    if (itemIndex === -1) {
      const newLineItems = [...cart?.lineItems, itemToAdd];
      setCart({
        ...cart,
        lineItems: newLineItems,
        subtotal: updateSubtotal(newLineItems),
      });
    } else {
      const lineItems = [...cart.lineItems];
      lineItems[itemIndex].quantity = lineItems[itemIndex].quantity + 1;
      setCart({
        lineItems: lineItems,
        totalQty: cart?.totalQty,
        subtotal: cart?.subtotal,
      });
    }
    console.log(cart);
  }

  function removeItemFromCart(id: string) {
    if (typeof cart === "undefined") return console.log("Cart not available");
    const currentItems = cart.lineItems;
    const updatedItems = currentItems.filter((i) => i.id !== id);
    setCart({
      lineItems: updatedItems,
      totalQty: cart?.totalQty,
      subtotal: cart?.subtotal,
    });
  }

  function clearCartItems() {
    setCart({
      lineItems: [],
      totalQty: cart?.totalQty,
      subtotal: cart?.subtotal,
    });
  }

  return { cart, addItemToCart, removeItemFromCart, clearCartItems };
}
