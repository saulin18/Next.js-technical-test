import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useProductStore } from '@/lib/store/product-store';
import { Product } from '@/lib/types/product';
import { useToast } from '@/hooks/use-toast';

export function useReviewedProducts() {
  const { reviewedProducts, deleteProduct } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const { toast } = useToast();

  const paginatedProducts = reviewedProducts.slice(0, page * 7);
  const hasMore = paginatedProducts.length < reviewedProducts.length;

  useEffect(() => {
    const loadMore = async () => {
      if (inView && hasMore && !isLoadingMore) {
        setIsLoadingMore(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          setPage(prev => prev + 1);
        } catch (error) {
          toast({
            title: 'Error loading more products',
            description: 'Failed to load additional products',
            variant: 'destructive',
          });
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    loadMore();
  }, [inView, hasMore, isLoadingMore, toast]);

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return {
    paginatedProducts,
    selectedProduct,
    isOpen,
    isLoadingMore,
    hasMore,
    ref,
    deleteProduct,
    handleView,
    onClose: () => setIsOpen(false)
  };
}