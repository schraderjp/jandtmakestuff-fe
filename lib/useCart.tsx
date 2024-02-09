"use client";

import { TypedObject } from "@portabletext/types";
import {
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

export type CartItem = {
  id: string;
  name: string;
  description?: TypedObject[];
  price: number;
  quantity: number;
  totalPrice: number;
};

export interface InitialState {
  items: CartItem[];
  totalLineItems: number;
  totalQuantity: number;
  cartTotal: number;
}

type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_ITEM"; id: string; payload: object }
  | { type: "CLEAR_CART" };

const initialState: any = {
  items: [],
  totalLineItems: 0,
  totalQuantity: 0,
  cartTotal: 0,
};

interface CartContextType extends InitialState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: CartItem["id"], quantity: number) => void;
  incrementQuantity: (id: CartItem["id"]) => void;
  decrementQuantity: (id: CartItem["id"]) => void;
  clearCart: () => void;
  inCart: (id: CartItem["id"]) => boolean;
  getItem: (id: CartItem["id"]) => CartItem | undefined;
}

export const CartContext = createContext<CartContextType | undefined>(
  initialState
);

const reducer: Reducer<CartContextType, Action> = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemsAfterAddition = [...state.items, action.payload];
      return generateCartState(state, itemsAfterAddition);

    case "REMOVE_FROM_CART":
      const itemsAfterRemoval = state.items.filter(
        (i: CartItem) => i.id !== action.id
      );
      return generateCartState(state, itemsAfterRemoval);

    case "CLEAR_CART":
      return initialState;

    case "UPDATE_ITEM":
      const items = state.items.map((i: CartItem) => {
        if (i.id !== action.id) return i;

        return {
          ...i,
          ...action.payload,
        };
      });

      return generateCartState(state, items);
  }
};

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [savedCart, saveCart] = useLocalStorage("jandtmakestuff-cart", {
    ...initialState,
  });

  const [state, dispatch] = useReducer(reducer, savedCart);

  const addItem = (item: CartItem, quantity = 1) => {
    if (!item.id) throw new Error("You must provide an `id` for items");
    if (quantity <= 0) return;

    const currentItem = state.items.find((i: CartItem) => i.id === item.id);

    if (!currentItem) {
      const payload = { ...item, quantity };
      dispatch({ type: "ADD_TO_CART", payload });
      return;
    }

    const payload = { ...item, quantity: currentItem.quantity + quantity };
    dispatch({ type: "UPDATE_ITEM", id: item.id, payload: payload });
  };

  const removeItem = (itemId: string) => {
    if (state.items.findIndex((i) => i.id === itemId) === -1)
      throw new Error("You must provide an `id` to remove an item.");
    dispatch({ type: "REMOVE_FROM_CART", id: itemId });
  };

  const inCart = (id: CartItem["id"]) => {
    return state.items.some((i: CartItem) => i.id === id);
  };

  const getItem = (id: CartItem["id"]) => state.items.find((i) => i.id === id);

  const updateItemQuantity = (id: CartItem["id"], quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", id });
      return;
    }

    const currentItem = state.items.find((item: CartItem) => item.id === id);

    if (!currentItem) throw new Error("No such item.");

    const payload = { ...currentItem, quantity };

    dispatch({
      type: "UPDATE_ITEM",
      id,
      payload,
    });
  };

  const incrementQuantity = (id: CartItem["id"]) => {
    const currentItem = state.items.find((item: CartItem) => item.id === id);
    if (!currentItem) throw new Error("No such item.");
    updateItemQuantity(id, currentItem.quantity + 1);
  };

  const decrementQuantity = (id: CartItem["id"]) => {
    const currentItem = state.items.find((item: CartItem) => item.id === id);
    if (!currentItem) throw new Error("No such item.");
    updateItemQuantity(id, currentItem.quantity - 1);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    saveCart(state);
  }, [state, saveCart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        decrementQuantity,
        incrementQuantity,
        inCart,
        getItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within the CartProvider");
  }

  return context;
};

const generateCartState = (state = initialState, items: CartItem[]) => {
  const totalLineItems = items.length;
  const isEmpty = totalLineItems === 0;

  return {
    ...initialState,
    ...state,
    items: calculateItemTotals(items),
    totalQuantity: calculateTotalItems(items),
    totalLineItems,
    cartTotal: calculateTotal(items),
    isEmpty,
  };
};

const calculateItemTotals = (items: CartItem[]) => {
  const newItems = items.map((i) => {
    i.totalPrice = i.price * i.quantity;
    return i;
  });
  return newItems;
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.quantity! * item.price, 0);
};

const calculateTotalItems = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.quantity!, 0);
};
