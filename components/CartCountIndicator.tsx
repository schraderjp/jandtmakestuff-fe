import React from "react";
import { Badge } from "./ui/badge";
import { useCart } from "@/lib/useCart";

const CartCountIndicator = () => {
  const { totalQuantity } = useCart();
  return (
    <>
      {totalQuantity ? (
        <Badge
          variant={"secondary"}
          className="absolute top-1 p-0 left-1/2 h-4 w-4 flex items-center justify-center"
        >
          {totalQuantity}
        </Badge>
      ) : null}
    </>
  );
};

export default CartCountIndicator;
