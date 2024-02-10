import React from 'react';
import AddToCart from './AddToCart';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Product } from '@/types/type';
import { PortableText } from '@portabletext/react';
import Currency from './atoms/Currency';
import Image from 'next/image';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card key={product.id} className="flex flex-col">
      <CardHeader className="text-xl font-bold h-24">{product.name}</CardHeader>
      <CardContent className="grid grid-cols-1 xs:grid-cols-2 xs:grid-temp-row-card sm:grid-cols-1 md:grid-cols-2 lg:cols-1">
        {product.imageUrl ? (
          <Image
            alt={product.imageAlt}
            className="w-36 h-36 mx-auto rounded-md"
            width={300}
            height={300}
            src={product.imageUrl}
          />
        ) : (
          <Image
            alt={'image of dog'}
            className="w-36 h-36 mx-auto rounded-md"
            width={300}
            height={300}
            src={'/undraw_dog_c7i6.svg'}
          />
        )}

        <PortableText value={product.description} />
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-y-4">
        <p className="text-lg pt-4">
          <Currency number={product.price} currency="usd" />
        </p>
        <AddToCart product={product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
