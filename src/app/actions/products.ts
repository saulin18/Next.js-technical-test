'use server'

import { ProductAdapter } from '@/lib/adapters/product-adapter';
import { Product } from '@/lib/types/product';

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getInitialProducts(): Promise<Product[]> {
  return getPaginatedProducts(1, 10);
}

export async function getPaginatedProducts(page: number, limit: number): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/posts?_page=${page}&_limit=${limit}`,
    { cache: 'no-store' }
  );
  const data = await response.json();
  return ProductAdapter.toProductList(data);
}
