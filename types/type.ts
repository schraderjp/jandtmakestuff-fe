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
  description: object[];
  //   currency: string;
  //   imageSrc: string;
  //   imageAlt: string;
};

// export type Cart = {
//   lineItems: Stripe.Product[]
// }
