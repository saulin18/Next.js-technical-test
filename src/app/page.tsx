import Link from "next/link";
import { ProductSkeleton } from "@/components/ui/product-skeleton";
import { getInitialProducts } from "./actions/products";
import { Suspense } from "react";
import ProductList from "@/components/product-list";

export default async function PendingProducts() {
 
  const initialProducts = await getInitialProducts();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products to Review</h1>
        <Link 
          href="/products/reviewed" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          View Reviewed Products
        </Link>
      </div>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      }>
        <ProductList initialProducts={initialProducts} />
      </Suspense>
    </div>
  );
}
