"use client";

import React from "react";
import { Button } from "./ui/button";
import { Product } from "@/types/type";
import { useShoppingCart } from "@/lib/useShoppingCart";

const AddToCart = ({ product }: { product: Product }) => {
  const { addItemToCart } = useShoppingCart();
  return (
    <Button onClick={() => addItemToCart(product)} variant={"default"}>
      Add to Cart
    </Button>
  );
};

export default AddToCart;
