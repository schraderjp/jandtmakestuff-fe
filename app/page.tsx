import { getProducts } from "./utils/sanityConfig";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </main>
  );
}
