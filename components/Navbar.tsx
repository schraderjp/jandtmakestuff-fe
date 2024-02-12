'use client';

import React, { useEffect } from 'react';
import Cart from './Cart';
import { CartItem } from '@/types/type';
import { useUser } from '@clerk/nextjs';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { client } from '@/app/utils/sanityConfig';
import { useCart } from '@/lib/useCart';

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { items, clearCart } = useCart();

  useEffect(() => {
    if (!user || !items) return;
    const getUserFromSanity = async () => {
      const userDoc = await client.createIfNotExists(
        {
          _type: 'user',
          _id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        },
        { returnDocuments: true }
      );

      const sanityCartItems = userDoc.shopping_cart.cart_items;

      if (!items.length) return;
      const createCartItems = async () => {
        const newSanityCartItems: CartItem[] = [];
        items.map((item, i) => {
          const currentItem = sanityCartItems.find(
            (i: CartItem) => i.id === item.id
          );
          if (!currentItem) return newSanityCartItems.push(item);
          const quantity = currentItem.quantity + item.quantity;
          const totalPrice = quantity * item.price;
          newSanityCartItems.push({
            name: item.name,
            id: item.id,
            price: item.price,
            quantity: quantity,
            totalPrice: totalPrice,
          });
        });

        return newSanityCartItems;
      };

      const updatedCartItems = await createCartItems();

      await client
        .patch(user.id)
        .set({ shopping_cart: { cart_items: updatedCartItems } })
        .commit({ autoGenerateArrayKeys: true });
    };

    clearCart();

    getUserFromSanity();
  }, [user, items, clearCart]);
  return (
    <nav className="px-1 py-2 flex items-center justify-between">
      <h1 className="pl-4 text-2xl font-bold">J and T Make Stuff</h1>
      {isLoaded && user && <p>Logged in</p>}
      <Cart />
      <UserButton />
      <SignUpButton />
      <SignInButton />
    </nav>
  );
};

export default Navbar;
