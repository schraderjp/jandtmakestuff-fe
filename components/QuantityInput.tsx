import React, { useState, useEffect, KeyboardEvent } from "react";
import { Input } from "./ui/input";
import { CartItem } from "@/types/type";
import { useCart } from "@/lib/useCart";

const QuantityInput = ({
  cartItem,
  quantity,
  setQuantity,
}: {
  cartItem: CartItem;
  quantity: number;
  setQuantity: (quantity: number) => void;
}) => {
  //   const [quantity, setQuantity] = useState(cartItem.quantity);
  const { updateItemQuantity, items } = useCart();
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
    <Input
      className="w-10 h-10 px-1 text-center text-lg"
      onFocus={(e) => {
        e.target.select();
      }}
      onKeyDown={handleInputKeyDown}
      onChange={(e) => {
        setQuantity(parseInt(e.target.value));
      }}
      type="text"
      value={quantity}
    />
  );
};

export default QuantityInput;
