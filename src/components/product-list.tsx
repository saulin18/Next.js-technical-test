"use client";

import { ProductCard } from "@/components/product-card";
import { ProductModal } from "@/components/product-modal";
import { Product } from "@/lib/types/product";
import { useProductList } from "@/hooks/use-product-list";

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const {
    pendingProducts,
    isLoadingMore,
    selectedProduct,
    isOpen,
    ref,
    handleStatusChange,
    handleDelete,
    handleView,
    onClose
  } = useProductList(initialProducts);

  return (
    <>
      {pendingProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingProducts.map((product) => (
              <ProductCard
                key={`product-${product.id}`}
                product={product}
                onDelete={handleDelete}
                onView={handleView}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
          
          <div ref={ref} className="h-20 w-full flex justify-center items-center mt-6">
            {isLoadingMore && (
              <div className="animate-pulse text-gray-500">Loading more products...</div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No pending products to review</p>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}