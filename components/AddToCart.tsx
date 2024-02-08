"use client";

import React, { KeyboardEvent, useEffect, useId, useState } from "react";
import { Button } from "./ui/button";
import { CartItem, Product } from "@/types/type";
import { useCart } from "@/lib/useCart";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";
import Quantity from "./Quantity";

const AddToCart = ({ product }: { product: Product }) => {
  const {
    addItem,
    items,
    inCart,
    getItem,
    incrementQuantity,
    decrementQuantity,
    updateItemQuantity,
  } = useCart();
  const [quantity, setQuantity] = useState(getItem(product.id)?.quantity);
  const handleInputKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (
      isNaN(parseInt(e.key)) &&
      e.key !== "Backspace" &&
      e.key !== "LeftArrow" &&
      e.key !== "RightArrow"
    )
      e.preventDefault();
  };
  useEffect(() => {
    if (!getItem(product.id)) return;
    setQuantity(getItem(product.id)?.quantity);
  }, [items]);

  return (
    <>
      {inCart(product.id) ? (
        <>
          <Button onClick={() => decrementQuantity(product.id)}>-</Button>
          <Input
            onKeyDown={handleInputKeyDown}
            onChange={(e) => {
              updateItemQuantity(product.id, parseInt(e.target.value));
            }}
            type="text"
            value={quantity}
            // defaultValue={getItem(product.id)?.quantity}
          />
          <Button onClick={() => incrementQuantity(product.id)}>+</Button>
        </>
      ) : (
        <Button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              quantity: 1,
              price: product.price,
              totalPrice: product.price,
            })
          }
          variant={"default"}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
