import { useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getPaginatedProducts } from "@/app/actions/products";
import { useProductStore } from "@/lib/store/product-store";
import { Product } from "@/lib/types/product";

export function useProductList(initialProducts: Product[]) {
  const { pendingProducts, addProducts, updateProductStatus, deleteProduct } = useProductStore();
  const [page, setPage] = useState(2);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref, inView } = useInView();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pendingProducts.length === 0 && initialProducts.length > 0) {
      addProducts(initialProducts);
    }
  }, [initialProducts, pendingProducts.length, addProducts]);

  const handleStatusChange = useCallback((id: number, status: 'approved' | 'rejected') => {
    updateProductStatus(id, status);
  }, [updateProductStatus]);

  const handleDelete = useCallback((id: number) => {
    deleteProduct(id);
  }, [deleteProduct]);

  const handleView = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const loadMoreProducts = async () => {
      if (inView && !isLoadingMore && pendingProducts.length > 0) {
        setIsLoadingMore(true);
        try {
          const newProducts = await getPaginatedProducts(page, 7);
          if (newProducts.length > 0) {
            addProducts(newProducts);
            setPage(prev => prev + 1);
          }
        } catch (error) {
          console.error('Error loading more products:', error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    loadMoreProducts();
  }, [inView, isLoadingMore, page, addProducts, pendingProducts.length]);

  return {
    pendingProducts,
    isLoadingMore,
    selectedProduct,
    isOpen,
    ref,
    handleStatusChange,
    handleDelete,
    handleView,
    onClose: () => setIsOpen(false)
  };
}