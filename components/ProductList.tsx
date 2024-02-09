import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/type";
import { getProducts } from "@/app/utils/sanityConfig";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductList;
