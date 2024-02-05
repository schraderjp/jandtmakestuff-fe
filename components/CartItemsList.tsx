import React from "react";
import { useShoppingCart } from "@/lib/useShoppingCart";

const CartItemsList = () => {
  const { getCartItems, removeItemFromCart } = useShoppingCart();
  const cartItems = getCartItems();
  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
          <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartItemsList;
