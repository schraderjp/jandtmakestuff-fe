import { useCart } from "@/lib/useCart";
import { CartItem } from "@/types/type";
import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useId,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus } from "lucide-react";

type QuantityProps = {
  item: CartItem;
  quantity: string;
  setItemQuantity: Dispatch<React.SetStateAction<string>>;
};

const Quantity = ({ item, quantity, setItemQuantity }: QuantityProps) => {
  const { updateItemQuantity } = useCart();

  const id = useId();
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
    // if (quantity === "") return;
    updateItemQuantity(item.id, parseInt(quantity));
  }, [quantity]);

  return (
    <div className="flex items-center justify-center">
      {quantity}
      <Button
        variant={"secondary"}
        className="h-8 w-8  sm:h-12 sm:w-12 p-1 rounded-none"
        onClick={() => {
          setItemQuantity((quantity) => (parseInt(quantity) - 1).toString());
        }}
      >
        <Minus className="" />
      </Button>

      <Input
        type="text"
        className="h-8 w-8 sm:h-12 sm:w-12 text-center text-sm sm:text-lg rounded-none"
        id={`input-${id}`}
        name="quantity"
        onKeyDown={handleInputKeyDown}
        onChange={(e) => {
          setItemQuantity(e.target.value);
          // e.target.value = String(item.quantity);
        }}
        value={quantity}
      />
      <Button
        className="h-8 w-8 sm:h-12 sm:w-12 p-1 rounded-none"
        variant={"secondary"}
        onClick={() => {
          setItemQuantity((quantity) => (parseInt(quantity) + 1).toString());
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default Quantity;
