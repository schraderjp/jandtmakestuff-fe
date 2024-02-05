"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
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
import { useShoppingCart } from "@/lib/useShoppingCart";
import dynamic from "next/dynamic";

const CartItemsList = dynamic(() => import("../components/CartItemsList"), {
  loading: () => <p>Loading cart...</p>,
});

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
          <SheetDescription></SheetDescription>
          <CartItemsList />
          <form action="/api/checkout_sessions" method="POST">
            <button type="submit" id="checkout-button">
              Checkout
            </button>
          </form>
        </SheetHeader>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
