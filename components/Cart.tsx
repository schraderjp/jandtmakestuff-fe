'use client';

import { Loader2Icon, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { initiateCheckout } from '@/lib/actions';
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
import { useCart } from '@/lib/useCart';
import CartItemsList from './CartItemsList';
import CartItemsListTest from './CartItemsList';
import { useFormStatus } from 'react-dom';
import CheckoutButton from './CheckoutButton';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import Currency from './atoms/Currency';
import dynamic from 'next/dynamic';

const CartCountIndicator = dynamic(() => import('./CartCountIndicator'), {
  ssr: false,
});

const Cart = () => {
  const { items, totalQuantity, cartTotal } = useCart();
  const { isLoaded, user, isSignedIn } = useUser();
  const initiateCheckoutWithData = initiateCheckout.bind(null, items);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative">
          <ShoppingCart size={24} />
          <CartCountIndicator />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full p-2 flex flex-col">
        <SheetClose></SheetClose>
        <SheetHeader>
          <SheetTitle className="text-center text-xl">Shopping Cart</SheetTitle>
          <SheetDescription>
            <p>{user?.primaryEmailAddress?.emailAddress}</p>
          </SheetDescription>
          <CartItemsList />
        </SheetHeader>
        <SheetFooter className="mt-auto ">
          <form
            className="py-2 w-full text-center"
            action={initiateCheckoutWithData}
          >
            <CheckoutButton />
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
