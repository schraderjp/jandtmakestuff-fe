"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Cart, CartItem } from "@/types/type";
import { useLocalStorage } from "usehooks-ts";

type CartContextType = {
  cart: {
    lineItems: CartItem[];
    totalQty: number;
    subtotal: number;
  };
  setCart: (cart: Cart) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  // const [cart, setCart] = useState<Cart>(
  //   { lineItems: [], totalQty: 0, subtotal: 0 },);
  const [cart, setCart] = useLocalStorage<CartContextType["cart"]>(
    "jandtmakestuff-cart",
    { lineItems: [], totalQty: 0, subtotal: 0 }
    // { initializeWithValue: false }
  );

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within the CartProvider");
  }

  return context;
};
