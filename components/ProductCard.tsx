import React from 'react';
import AddToCart from './AddToCart';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Product } from '@/types/type';
import { PortableText } from '@portabletext/react';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="p-2">
      <Card key={product.id}>
        <CardHeader>{product.name}</CardHeader>
        <CardContent>
          <PortableText value={product.description} />
        </CardContent>
        <CardFooter>
          <AddToCart product={product} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
