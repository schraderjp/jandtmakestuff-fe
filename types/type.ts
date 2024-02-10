import { TypedObject } from '@portabletext/types';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: TypedObject[];
  //   currency: string;
  imageUrl: string;
  imageAlt: string;
};

export type Cart = {
  lineItems: CartItem[];
  totalQty: number;
  subtotal: number;
};
