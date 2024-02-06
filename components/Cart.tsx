'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import CartContent from './CartContent';

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto">
          <ShoppingCart size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetClose></SheetClose>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription></SheetDescription>
          <CartContent />
        </SheetHeader>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
