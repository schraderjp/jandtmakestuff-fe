import { client } from "@/app/utils/sanityConfig";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItem, initialState, useCart } from "./useCart";
import { SanityDocument } from "@sanity/client";

export const useSanityCart = () => {
  const [sanityCart, setSanityCart] = useState<CartItem[] | null>(null);
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

  const addItemToSanityCart = async (cartItem: CartItem) => {
    if (!user) {
      throw new Error("No user logged in!");
    }

    console.log(
      `Items in cart: \n\n${JSON.stringify(
        sanityCart
      )}\n\nItem to add: \n\n${JSON.stringify(cartItem)}`
    );
  };

  // const doc = await client
  //   .patch(user.id)
  //   .setIfMissing({ shopping_cart: { cart_items: [] } })
  //   .append('shopping_cart.cart_items', [cartItem])
  //   .commit({ autoGenerateArrayKeys: true });

  //   await client
  //     .patch(user.id)
  //     .setIfMissing({ shopping_cart: { cart_items: [] } })
  //     .append("shopping_cart.cart_items", [
  //       {
  //         id: payload.id,
  //         name: payload.name,
  //         price: payload.price,
  //         totalPrice: payload.quantity * payload.price,
  //         quantity: payload.quantity,
  //       },
  //     ])
  //     .commit({ autoGenerateArrayKeys: true })
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error));

  //   const doc = client
  //     .patch(user.id)
  //     .set({ [`shopping_cart.cart_items[id==${payload.id}]`]: payload })
  //     .commit({ autoGenerateArrayKeys: true, returnDocuments: true })
  //     .catch((err) => console.log(err));
  //   console.log(doc);

  //   const doc = client.fetch(`*[_type=='user' && _id=='${user.id}']`);
  //   const sanityCartItems = doc.shopping_cart.cart_items;
  //   const currentItem = sanityCartItems.find(
  //     (i: CartItem) => i.id === cartItem.id
  //   );
  //   if (!currentItem) return newSanityCartItems.push(cartItem);
  //   const quantity = currentItem.quantity + cartItem.quantity;
  //   const totalPrice = quantity * cartItem.price;
  //   newSanityCartItems.push({
  //     name: cartItem.name,
  //     id: cartItem.id,
  //     price: cartItem.price,
  //     quantity: quantity,
  //     totalPrice: totalPrice,
  //   });
  // };

  useEffect(() => {
    // if (!isLoaded || !user) return;
    console.log("useEffect");
    // const query = `*[_type == 'user' && _id == '${user.id}']`;
    // const getUserDoc = async () => {
    //   const userDoc = await client.fetch(query);
    //   if (!userDoc) {
    //     return await client.createIfNotExists(
    //       {
    //         _type: "user",
    //         _id: user.id,
    //         email: user.primaryEmailAddress?.emailAddress,
    //         shopping_cart: { cart_items: [] },
    //       },
    //       { returnDocuments: true }
    //     );
    //   }

    //   return userDoc;
    // };

    // const addLocalCartItems = async () => {
    //   if (!items) return;
    //   const userDoc = await getUserDoc();
    // const remoteCart = userDoc[0].shopping_cart.cart_items;
    // console.log(items);
    // if (items.length) {
    //   let addition = client.patch(user.id);
    //   for (let i = 0; i < items.length; i++) {
    //     const currentItem = remoteCart.find(
    //       (item: CartItem) => item.id === items[i].id
    //     );
    //     console.log(i, currentItem);
    //     if (!currentItem) {
    //       addition = addition.append(`shopping_cart.cart_items`, [items[i]]);
    //     }
    //     addition = addition.inc({
    //       [`shopping_cart.cart_items[id=="${items[i].id}"].quantity`]: 1,
    //     });
    //   }
    //   await addition.commit({ autoGenerateArrayKeys: true });
    //   clearCart();
    // }
    // };

    // addLocalCartItems();

    // const subscription = client.listen(query).subscribe((update) => {
    //   console.log(update.result);
    // });

    // return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (!user || !items) return;
  //   const getUserFromSanity = async () => {
  //     const userDoc: SanityDocument<{
  //       _type: string;
  //       _id: string;
  //       email: string | undefined;
  //       shopping_cart: { cart_items: CartItem[] };
  // }> = await client.createIfNotExists(
  //   {
  //     _type: "user",
  //     _id: user.id,
  //     email: user.primaryEmailAddress?.emailAddress,
  //     shopping_cart: { cart_items: [] },
  //   },
  //   { returnDocuments: true }
  // );

  //     const sanityCartItems = userDoc.shopping_cart.cart_items;

  //     if (!items.length) return;
  //     const createCartItems = async () => {
  //       const newSanityCartItems: CartItem[] = [];
  //       items.map((item, i) => {
  //         const currentItem = sanityCartItems.find(
  //           (i: CartItem) => i.id === item.id
  //         );
  //         if (!currentItem) return newSanityCartItems.push(item);
  //         const quantity = currentItem.quantity + item.quantity;
  //         const totalPrice = quantity * item.price;
  //         newSanityCartItems.push({
  //           name: item.name,
  //           id: item.id,
  //           price: item.price,
  //           quantity: quantity,
  //           totalPrice: totalPrice,
  //         });
  //       });

  //       return newSanityCartItems;
  //     };

  //     const updatedCartItems = await createCartItems();

  //     await client
  //       .patch(user.id)
  //       .set({ shopping_cart: { cart_items: updatedCartItems } })
  //       .commit({ autoGenerateArrayKeys: true });
  //   };

  //   clearCart();

  //   getUserFromSanity();
  // }, [user, items, clearCart]);

  return { sanityCart, setSanityCart, addItemToSanityCart, testFunction };
};
