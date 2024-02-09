"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/app/utils/sanityConfig";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductList;
