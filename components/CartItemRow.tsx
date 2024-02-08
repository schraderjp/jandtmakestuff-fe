import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CartItem } from "@/types/type";
import Currency from "./atoms/Currency";
import { Button } from "./ui/button";
import { Minus, Plus, Trash, X } from "lucide-react";
import { useCart } from "@/lib/useCart";
import { Input } from "./ui/input";

type CartItemRowProps = {
  item: CartItem;
};

const CartItemRow = ({ item }: CartItemRowProps) => {
  const [quantity, setItemQuantity] = useState<string>(
    item.quantity.toString()
  );
  const {
    removeItem,
    incrementQuantity,
    decrementQuantity,
    updateItemQuantity,
  } = useCart();
  // const setQuantity = (
  //   itemId: CartItem["id"],
  //   e: ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (e.target.value === "") return;
  //   updateItemQuantity(itemId, parseInt(e.target.value));
  // };
  const ref = useRef<HTMLInputElement | null>(null);
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
    if (quantity === "") return;
    updateItemQuantity(item.id, parseInt(quantity));
  }, [quantity]);

  return (
    <Card className="overflow-hidden" key={item.id}>
      <div className="flex">
        <div className="p-2">
          <div className="h-full relative w-16 border flex-shrink items-center justify-center">
            {/* To be replaced with Next/Image component once images are added to Sanity schema */}
            <Button
              className="h-8 w-8 absolute -top-2 -left-2 p-0 rounded-full"
              onClick={() => removeItem(item.id)}
              size={"sm"}
              variant={"secondary"}
            >
              <X />
            </Button>
            <p className="flex w-full h-full items-center justify-center">
              Image
            </p>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <CardHeader className="p-2 ">
            <div className="px-2 w-full">
              <CardTitle className="text-left text-base sm:text-lg text-ellipsis whitespace-nowrap overflow-hidden  ">
                {item.name}
              </CardTitle>
              <CardDescription className="text-left text-base sm:text-lg">
                <Currency number={item.price} currency="usd" />
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex items-center gap-x-2 justify-between p-2 w-full flex-grow">
            <div className="flex items-center justify-center">
              <Button
                variant={"secondary"}
                className="h-8 w-8  sm:h-12 sm:w-12 p-1 rounded-none"
                onClick={() => {
                  setItemQuantity((quantity) =>
                    (parseInt(quantity) - 1).toString()
                  );
                }}
              >
                <Minus className="" />
              </Button>

              <Input
                ref={ref}
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
                  setItemQuantity((quantity) =>
                    (parseInt(quantity) + 1).toString()
                  );
                }}
              >
                <Plus />
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
      <CardFooter className="p-0"></CardFooter>
    </Card>
  );
};

export default CartItemRow;
