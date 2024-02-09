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
import { Equal, Minus, Plus, Trash, X } from "lucide-react";
import { useCart } from "@/lib/useCart";
import { Input } from "./ui/input";

type CartItemRowProps = {
  item: CartItem;
};

const CartItemRow = ({ item }: CartItemRowProps) => {
  const [quantity, setItemQuantity] = useState<string>(
    item.quantity.toString()
  );
  const { removeItem, updateItemQuantity } = useCart();

  const id = useId();
  const handleInputKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
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
    updateItemQuantity(item.id, parseInt(quantity));
  }, [quantity]);

  return (
    <Card
      className="overflow-hidden border-x-0 shadow-none rounded-none py-2"
      key={item.id}
    >
      <div className="flex w-full">
        <div className="p-1">
          <div className="h-full relative w-16 sm:w-24 border flex-shrink items-center justify-center">
            {/* To be replaced with Next/Image component once images are added to Sanity schema */}

            <p className="flex w-full h-full rounded-md items-center justify-center">
              Image
            </p>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <CardHeader className="p-0">
            <div className="px-2 w-full">
              <CardTitle className="text-left text-base sm:text-lg text-ellipsis whitespace-nowrap overflow-hidden  ">
                {item.name}
              </CardTitle>
              <CardDescription className="text-left text-base sm:text-lg">
                <Currency number={item.price} currency="usd" />
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex items-center gap-x-2 justify-between px-2 py-1 w-full flex-grow">
            <div className="flex items-center justify-start w-full">
              <Button
                variant={"secondary"}
                className="h-8 w-8 p-2 rounded-none"
                onClick={() => {
                  setItemQuantity((quantity) =>
                    (parseInt(quantity) - 1).toString()
                  );
                }}
              >
                {item.quantity === 1 ? <Trash /> : <Minus className="" />}
              </Button>

              <Input
                type="text"
                className="h-8 w-20 p-0 text-center text-sm  rounded-none"
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
                className="h-8 w-8  p-2 rounded-none"
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
