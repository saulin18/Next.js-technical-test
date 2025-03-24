import { create } from 'zustand';
import { Product } from '../types/product';
import { persist } from 'zustand/middleware';

interface ProductState {
  pendingProducts: Product[];
  reviewedProducts: Product[];
  addProducts: (products: Product[]) => void;
  updateProductStatus: (id: number, status: 'approved' | 'rejected') => void;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      pendingProducts: [],
      reviewedProducts: [],
      addProducts: (products) =>
        set((state) => ({
          pendingProducts: [
            ...state.pendingProducts,
            ...products.filter(newProduct => 
              !state.pendingProducts.some(existing => existing.id === newProduct.id)
            )
          ],
        })),
      updateProductStatus: (id, status) =>
        set((state) => {
          const product = state.pendingProducts.find(p => p.id === id);
          if (!product) return state;
          
          return {
            pendingProducts: state.pendingProducts.filter(p => p.id !== id),
            reviewedProducts: [...state.reviewedProducts, { ...product, status }]
          };
        }),
      deleteProduct: (id) =>
        set((state) => ({
          pendingProducts: state.pendingProducts.filter(p => p.id !== id),
          reviewedProducts: state.reviewedProducts.filter(p => p.id !== id)
        })),
    }),
    {
      name: 'product-storage',
    }
  )
);