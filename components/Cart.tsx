"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { initiateCheckout } from "@/lib/actions";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useCart } from "@/lib/useCart";
import CartItemsList from "./CartItemsList";
import CartItemsListTest from "./CartItemsList";

const Cart = () => {
  const { items } = useCart();
  const initiateCheckoutWithData = initiateCheckout.bind(null, items);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto">
          <ShoppingCart size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full">
        <SheetClose></SheetClose>
        <SheetHeader>
          <SheetTitle className="text-center text-xl">Shopping Cart</SheetTitle>
          <SheetDescription></SheetDescription>
          <CartItemsList />
        </SheetHeader>
        <SheetFooter>
          <form
            className="mt-auto py-2 w-full text-center"
            action={initiateCheckoutWithData}
          >
            <Button
              className="w-full text-xl"
              size={"lg"}
              type="submit"
              id="checkout-button"
            >
              Checkout
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
