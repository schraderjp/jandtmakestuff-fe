import React from "react";
import { Button } from "./ui/button";
import { useCart } from "@/lib/useCart";
import { initiateCheckout } from "@/lib/actions";
import CartItemsList from "../components/CartItemsList";

const CartContent = () => {
  return (
    <div className="h-full flex flex-col min-h-full">
      <CartItemsList />
    </div>
  );
};

export default CartContent;
