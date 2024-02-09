import React, { useEffect, useState } from "react";
import { useCart } from "@/lib/useCart";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import CartItemRow from "./CartItemRow";
import Currency from "./atoms/Currency";

const CartItemsList = () => {
  const { items, removeItem, cartTotal, totalQuantity } = useCart();
  const [quantity, setQuantity] = useState(false);
  if (items.length === 0)
    return (
      <p className="py-8 flex items-center justify-center">
        Your cart is currently empty.
      </p>
    );
  return (
    <>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>
      <p className="flex items-center justify-between text-xl font-bold py-3">
        <span className="inline-block ">Cart Total:</span>
        <span className="inline-block">
          <Currency currency="usd" number={cartTotal} />
        </span>
      </p>
    </>
  );
};

export default CartItemsList;
