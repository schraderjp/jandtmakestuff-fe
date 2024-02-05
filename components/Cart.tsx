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
import { useShoppingCart } from '@/lib/useShoppingCart';

const Cart = () => {
  const { getCartItems, addItemToCart } = useShoppingCart();
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
          <SheetDescription>
            {JSON.stringify(getCartItems())}
            <button
              onClick={() => addItemToCart({ id: 'adfadsf', name: 'asdfasdf' })}
            >
              Add
            </button>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
