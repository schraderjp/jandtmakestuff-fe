import { CartItem } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStoreState = {
  items: CartItem[];
  totalLineItems: number;
  totalQuantity: number;
  cartTotal: number;
  addItem: (item: CartItem) => void;
  addQuantity: () => void;
};

export const useCartStore = create(
  persist<CartStoreState>(
    (set, get) => ({
      items: [],
      totalLineItems: 0,
      totalQuantity: 0,
      cartTotal: 0,
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      addQuantity: () =>
        set((state) => ({ totalQuantity: state.totalQuantity + 1 })),
    }),
    {
      name: "jandtmakestuff-shopping-cart",
    }
  )
);
