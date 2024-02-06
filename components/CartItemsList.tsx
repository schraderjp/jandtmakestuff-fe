import React from "react";
import { useShoppingCart } from "@/lib/useShoppingCart";
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

const CartItemsList = () => {
  const { cart, removeItemFromCart } = useShoppingCart();
  if (cart.lineItems.length === 0) return <p>Your cart is currently empty.</p>;
  return (
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
        {cart.lineItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Button
                className="px-1 py-1"
                variant={"outline"}
                onClick={() => removeItemFromCart(item.id)}
              >
                <X />
              </Button>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-left" colSpan={3}>
            Subtotal:
          </TableCell>
          <TableCell>${cart?.subtotal?.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CartItemsList;
