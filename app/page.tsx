import ProductList from '@/components/ProductList';
import { getProducts } from './utils/sanityConfig';
import { Button } from '@/components/ui/button';
import Cart from '@/components/Cart';

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <Cart />
      <ProductList products={products} />
    </main>
  );
}
