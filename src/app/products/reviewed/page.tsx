'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import { ProductSkeleton } from '@/components/ui/product-skeleton';
import { useReviewedProducts } from '@/hooks/use-reviewed-products';

export default function ReviewedProducts() {
  const {
    paginatedProducts,
    selectedProduct,
    isOpen,
    isLoadingMore,
    hasMore,
    ref,
    deleteProduct,
    handleView,
    onClose
  } = useReviewedProducts();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviewed Products</h1>
        <Link 
          href="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          View Pending Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={deleteProduct}
            onView={handleView}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center mt-8">
          {isLoadingMore ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Load more</p>
          )}
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}