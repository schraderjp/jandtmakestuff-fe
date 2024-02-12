import { client } from '@/app/utils/sanityConfig';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { CartItem, useCart } from './useCart';

export const useSanityCart = () => {
  const [sanityCart, setSanityCart] = useState<any>();
  const { isLoaded, user } = useUser();
  const { clearCart, items } = useCart();

  const testFunction = async () => {
    if (!user) return;
    await client
      .patch(user.id)
      .inc({
        [`shopping_cart.cart_items[id=="092ed37e-39b6-4dc3-8e79-9c342727b9b9"].quantity`]: 1,
      })
      .commit();
  };

  const addItem = async (cartItem: CartItem) => {
    if (!user) {
      throw new Error('No user logged in!');
    }

    // const doc = await client
    //   .patch(user.id)
    //   .setIfMissing({ shopping_cart: { cart_items: [] } })
    //   .append('shopping_cart.cart_items', [cartItem])
    //   .commit({ autoGenerateArrayKeys: true });

    const doc = client.fetch(`*[_type=='user' && _id=='${user.id}']`);
    const sanityCartItems = doc.shopping_cart.cart_items;
    const currentItem = sanityCartItems.find(
      (i: CartItem) => i.id === cartItem.id
    );
    if (!currentItem) return newSanityCartItems.push(cartItem);
    const quantity = currentItem.quantity + cartItem.quantity;
    const totalPrice = quantity * cartItem.price;
    newSanityCartItems.push({
      name: cartItem.name,
      id: cartItem.id,
      price: cartItem.price,
      quantity: quantity,
      totalPrice: totalPrice,
    });
  };

  useEffect(() => {
    if (!isLoaded || !user) return;
    const query = `*[_type == 'user' && _id == '${user.id}']`;
    const subscription = client.listen(query).subscribe((update) => {
      setSanityCart(update.result);
      console.log(update.result);
    });

    return () => subscription.unsubscribe();
  }, [sanityCart, isLoaded, user]);

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

  return { sanityCart, setSanityCart, addItem, testFunction };
};
