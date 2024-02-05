import React from 'react';
import ProductCard from './ProductCard';
import stripe from '@/config/stripe';

async function getStripeProducts() {
  try {
    const stripeProducts = await stripe.products.list();
    return stripeProducts;
  } catch (error) {
    throw new Error('Error retrieving products');
  }
}

const ProductList = async () => {
  const products = await getStripeProducts();
  return (
    <>
      {products.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductList;
