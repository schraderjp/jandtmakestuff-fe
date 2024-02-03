import { Product } from '@/types/type';
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
