import { Product } from '@/types/type';
import React from 'react';
import AddToCart from './AddToCart';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <Card>
        <CardHeader>{product.name}</CardHeader>
        <CardContent>
          <p>Product Description</p>
        </CardContent>
        <CardFooter>
          <AddToCart />
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
