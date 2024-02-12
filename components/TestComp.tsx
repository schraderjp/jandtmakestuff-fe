"use client";

import { useCartStore } from "@/stores/useCartStore";
import useStore from "@/stores/useStore";
import React from "react";

const TestComp = () => {
  const totalItems = useStore(useCartStore, (state) => state.totalQuantity);
  const items = useStore(useCartStore, (state) => state.items);
  const addQuantity = useStore(useCartStore, (state) => state.addQuantity);
  return (
    <div>
      <p>{totalItems}</p>
      <button onClick={() => addQuantity?.()}>Add Item</button>
    </div>
  );
};

export default TestComp;
