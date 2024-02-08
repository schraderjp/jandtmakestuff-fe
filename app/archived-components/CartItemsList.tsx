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

import CartItemRow from "./CartItemRow";

const CartItemsList = () => {
  const { items, removeItem, cartTotal } = useCart();
  const [quantity, setQuantity] = useState(false);
  if (items.length === 0)
    return (
      <p className="h-24 flex items-center justify-center">
        Your cart is currently empty.
      </p>
    );
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <CartItemRow item={item} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-left" colSpan={3}>
              Subtotal:
            </TableCell>
            <TableCell>${cartTotal.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CartItemsList;
