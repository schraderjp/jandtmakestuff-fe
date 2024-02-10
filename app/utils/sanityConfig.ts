import { Product } from '@/types/type';
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'nz5vltsq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-23',
  token: process.env.SANITY_API_TOKEN,
});

export async function getProducts(): Promise<Product[]> {
  const products = await client.fetch(
    '*[_type == "product" && !(_id in path(\'drafts.**\'))]',
    { cache: 'no-store' }
  );
  // console.log(products);
  return products;
}
