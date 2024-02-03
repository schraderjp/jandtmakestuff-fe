import { Product } from "@/types/type";
import React from "react";

const Product = ({ product }: { product: Product }) => {
  return (
    <>
      <div key={product.id}>{product.name}</div>
      <AddToCart />
    </>
  );
};

export default Product;
