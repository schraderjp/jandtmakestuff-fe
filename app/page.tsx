import ProductList from '@/components/ProductList';
import { getProducts } from './utils/sanityConfig';
import { Button } from '@/components/ui/button';
import Cart from '@/components/Cart';

export default function Home() {
  return (
    <main>
      <ProductList />
    </main>
  );
}
