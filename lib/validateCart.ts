import { CartItem, Product } from '@/types/type';

export const validateCart = (productList: Product[], cart: CartItem[]) => {
  let validatedItems: CartItem[] = [];

  for (const id in cart) {
    const currentProduct = productList.find(
      (product) => product.id === cart[id].id
    );

    if (typeof currentProduct === 'undefined') {
      throw new Error('Cart item is not in product list.');
    }

    const validatedItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      quantity: cart[id].quantity,
      totalPrice: cart[id].quantity * cart[id].price,
    };
    validatedItems.push(validatedItem);
  }

  return validatedItems;
};
