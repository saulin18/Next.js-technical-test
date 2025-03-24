import { Product, ProductResponse } from '../types/product';

export class ProductAdapter {
  static toProduct(data: ProductResponse): Product {
    return {
      id: data.id,
      title: data.title,
      description: data.body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  }

  static toProductList(data: ProductResponse[]): Product[] {
    return data.map(this.toProduct);
  }
}