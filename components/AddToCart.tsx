"use client";

import React, { KeyboardEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CartItem, Product } from "@/types/type";
import { useCart } from "@/lib/useCart";
import { Minus, Plus, Trash } from "lucide-react";
import { Input } from "./ui/input";
import QuantityInput from "./QuantityInput";

const AddToCart = ({ product }: { product: Product }) => {
  const { addItem, inCart, getItem, updateItemQuantity, items } = useCart();
  //
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (!inCart(product.id)) {
      setIsInCart(false);
      return;
    }
    setIsInCart(true);
  }, [items]);
  return (
    <div>
      {isInCart ? (
        <div className="flex gap-x-2">
          <Button
            className="w-10 h-10 px-1"
            variant={"default"}
            onClick={() => {
              const currentItem = getItem(product.id);
              if (!currentItem) return;

              updateItemQuantity(currentItem.id, currentItem.quantity - 1);
            }}
          >
            {getItem(product.id)?.quantity === 1 ? <Trash /> : <Minus />}
          </Button>
          <QuantityInput cartItem={getItem(product.id) as CartItem} />
          <Button
            className="w-10 h-10 px-1"
            variant={"default"}
            onClick={() => {
              const currentItem = getItem(product.id);
              if (!currentItem) return;
              updateItemQuantity(currentItem.id, currentItem.quantity + 1);
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
