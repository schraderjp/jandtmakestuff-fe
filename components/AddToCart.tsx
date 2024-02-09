"use client";

import React, { KeyboardEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CartItem, Product } from "@/types/type";
import { useCart } from "@/lib/useCart";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";
import QuantityInput from "./QuantityInput";

const AddToCart = ({ product }: { product: Product }) => {
  const {
    addItem,
    inCart,
    getItem,
    incrementQuantity,
    decrementQuantity,
    updateItemQuantity,
    items,
  } = useCart();
  const itemInCart = getItem(product.id);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(itemInCart?.quantity || 1);
  useEffect(() => {
    if (!itemInCart || isNaN(quantity)) return;
    updateItemQuantity(itemInCart.id, quantity);
  }, [quantity]);
  return (
    <div>
      {itemInCart ? (
        <div className="flex gap-x-2">
          <Button
            className="w-10 h-10 px-1"
            variant={"default"}
            onClick={() => {
              const item = getItem(product.id);
              if (!item) return;
              setQuantity((prev) => prev - 1);
            }}
          >
            <Minus />
          </Button>
          <QuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            cartItem={itemInCart}
          />
          <Button
            className="w-10 h-10 px-1"
            variant={"default"}
            onClick={() => {
              if (quantity <= 0) return;
              const item = getItem(product.id);
              if (!item) return;
              setQuantity((prev) => prev + 1);
            }}
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <Button
          className="text-lg  h-10 "
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              quantity: 1,
              price: product.price,
              totalPrice: product.price,
            })
          }
          variant={"default"}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
