"use client";

import TestComp from "@/components/TestComp";
import { useCartStore } from "@/stores/useCartStore";
import useStore from "@/stores/useStore";
import React from "react";

const Cart = () => {
  const totalItems = useStore(useCartStore, (state) => state.totalQuantity);
  const items = useStore(useCartStore, (state) => state.items);
  const addQuantity = useStore(useCartStore, (state) => state.addQuantity);
  return (
    <div>
      <TestComp />
    </div>
  );
};

export default Cart;
