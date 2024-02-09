import React, { useState, useEffect, KeyboardEvent, useId } from "react";
import { Input } from "./ui/input";
import { CartItem } from "@/types/type";
import { useCart } from "@/lib/useCart";
import { Button } from "./ui/button";
import { Minus, Plus, Trash } from "lucide-react";

const QuantityInput = ({ cartItem }: { cartItem: CartItem }) => {
  const [quantity, setItemQuantity] = useState<string>(
    cartItem.quantity.toString()
  );
  const { updateItemQuantity, items } = useCart();
  const id = useId();
  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (
      isNaN(parseInt(e.key)) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowRight" &&
      e.key !== "ArrowLeft" &&
      e.key !== "Tab"
    )
      e.preventDefault();
  };

  useEffect(() => {
    if (quantity === "") return;
    updateItemQuantity(cartItem.id, parseInt(quantity));
  }, [quantity]);

  return (
    <div className="flex gap-x-2">
      <Button
        className="w-10 h-10 px-1"
        variant={"default"}
        onClick={() => {
          setItemQuantity((quantity) => (parseInt(quantity) - 1).toString());
        }}
      >
        {cartItem.quantity === 1 ? <Trash /> : <Minus />}
      </Button>
      <Input
        id={`input-${id}`}
        className="w-10 h-10 px-1 text-center text-lg"
        onKeyDown={handleInputKeyDown}
        onChange={(e) => {
          setItemQuantity(e.target.value);
        }}
        type="text"
        value={quantity}
      />
      <Button
        className="w-10 h-10 px-1"
        variant={"default"}
        onClick={() => {
          setItemQuantity((quantity) => (parseInt(quantity) + 1).toString());
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityInput;
