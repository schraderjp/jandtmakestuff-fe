import React, { Suspense } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/type";
import { getProducts } from "@/app/utils/sanityConfig";

const ProductList = async () => {
  const products = await getProducts();
  return (
    <div className="grid p-2 gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
