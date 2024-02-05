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
import dynamic from 'next/dynamic';

const CartContent = dynamic(() => import('../components/CartContent'), {
  loading: () => <p>Loading cart...</p>,
});

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
