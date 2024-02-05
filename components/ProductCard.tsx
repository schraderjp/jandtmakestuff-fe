import React from 'react';
import AddToCart from './AddToCart';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Stripe from 'stripe';

const ProductCard = ({ product }: { product: Stripe.Product }) => {
  return (
    <div className='p-2'>
      <Card key={product.id}>
        <CardHeader>{product.name}</CardHeader>
        <CardContent>
          <p>{product.description}</p>
        </CardContent>
        <CardFooter>
          <AddToCart />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
