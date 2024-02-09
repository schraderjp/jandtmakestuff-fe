"use client";

import React, { KeyboardEvent } from "react";
import { Button } from "./ui/button";
import { CartItem, Product } from "@/types/type";
import { useCart } from "@/lib/useCart";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";

const AddToCart = ({ product }: { product: Product }) => {
  const {
    addItem,
    inCart,
    getItem,
    incrementQuantity,
    decrementQuantity,
    updateItemQuantity,
  } = useCart();

  const handleInputKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (
      isNaN(parseInt(e.key)) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    )
      e.preventDefault();
  };

  return (
    <div>
      {inCart(product.id) ? (
        <div className="flex gap-x-2">
          <Button
            className="w-10 h-10 px-1"
            variant={"default"}
            onClick={() => {
              const item = getItem(product.id);
              if (!item) return;
              decrementQuantity(item.id);
            }}
          >
            <Minus />
          </Button>
          <Input
            className="w-10 h-10 px-1 text-center text-lg"
            onFocus={(e) => {
              e.target.select();
            }}
            onKeyDown={handleInputKeyDown}
            onChange={(e) => {
              const item = getItem(product.id);
              if (e.target.value === "" || !item) return;
              updateItemQuantity(item.id, parseInt(e.target.value));
            }}
            type="text"
            value={getItem(product.id)?.quantity}
          />
          <Button
            className="w-10 h-10 px-1"
            variant={"default"}
            onClick={() => {
              const item = getItem(product.id);
              if (!item) return;
              incrementQuantity(item.id);
            }}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <Button
          className="text-lg  h-10 "
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
    </div>
  );
};

export default AddToCart;
