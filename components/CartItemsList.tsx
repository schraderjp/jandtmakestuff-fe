import React from 'react';
import { useCart } from '@/lib/useCart';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const CartItemsList = () => {
  const { items, removeItem, cartTotal } = useCart();
  if (items.length === 0) return <p>Your cart is currently empty.</p>;
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
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Button
                className="px-1 py-1"
                variant={'outline'}
                onClick={() => removeItem(item.id)}
              >
                <X />
              </Button>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
          </TableRow>
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
  );
};

export default CartItemsList;
