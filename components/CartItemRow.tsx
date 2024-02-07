import React, { ChangeEvent, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CartItem } from "@/types/type";
import { useCart } from "@/lib/useCart";
import { X } from "lucide-react";

const CartItemRow = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState(String(item.quantity));
  const { removeItem } = useCart();
  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 0) return;
    setQuantity(e.target.value);
  };
  return (
    <TableRow key={item.id}>
      <TableCell>
        <Button
          className="px-1 py-1"
          variant={"outline"}
          onClick={() => removeItem(item.id)}
        >
          <X />
        </Button>
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell className="p-1">
        <Input
          autoFocus
          className="h-12 w-12 px-1 text-center"
          type="number"
          onChange={onQuantityChange}
          value={quantity}
        />
      </TableCell>
      <TableCell>${item.price.toFixed(2)}</TableCell>
    </TableRow>
  );
};

export default CartItemRow;
