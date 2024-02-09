import React from "react";
import AddToCart from "./AddToCart";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Product } from "@/types/type";
import { PortableText } from "@portabletext/react";
import Currency from "./atoms/Currency";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="p-2">
      <Card key={product.id}>
        <CardHeader className="text-xl font-bold">{product.name}</CardHeader>
        <CardContent>
          <PortableText value={product.description} />
          <p className="text-lg pt-4">
            <Currency number={product.price} currency="usd" />
          </p>
        </CardContent>
        <CardFooter>
          <AddToCart product={product} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
