'use client';

import { TypedObject } from '@portabletext/types';
import {
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

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

interface CartContextType extends InitialState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

type Action =
  | {
      type: 'ADD_TO_CART';
      payload: CartItem;
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: string;
    }
  | {
      type: 'CLEAR_CART';
    };

const initialState: any = {
  items: [],
  totalLineItems: 0,
  totalQuantity: 0,
  cartTotal: 0,
};

export const CartContext = createContext<CartContextType | undefined>(
  initialState
);

const reducer: Reducer<CartContextType, Action> = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemsAfterAddition = [...state.items, action.payload];
      return generateCartState(state, itemsAfterAddition);

    case 'REMOVE_FROM_CART':
      const itemsAfterRemoval = state.items.filter(
        (i) => i.id !== action.payload
      );
      return generateCartState(state, itemsAfterRemoval);

    case 'CLEAR_CART':
      return state;
  }
};

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [savedCart, saveCart] = useLocalStorage(
    'jandtmakestuff-cart',
    JSON.stringify({ ...initialState })
  );

  const [state, dispatch] = useReducer(reducer, JSON.parse(savedCart));

  const addItem = (item: CartItem, quantity = 1) => {
    if (!item.id) throw new Error('You must provide an `id` for items');
    if (quantity <= 0) return;
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeItem = (itemId: string) => {
    if (state.items.findIndex((i) => i.id === itemId) === -1)
      throw new Error('You must provide an `id` to remove an item.');
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within the CartProvider');
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
    totalItems: calculateTotalItems(items),
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

const calculateTotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity! * item.price, 0);

const calculateTotalItems = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);
