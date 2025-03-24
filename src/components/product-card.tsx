import { Product } from '@/lib/types/product';
import { Trash2, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
  onStatusChange?: (id: number, status: 'approved' | 'rejected') => void;
  showStatus?: boolean;
}

export function ProductCard({ 
  product, 
  onDelete, 
  onView, 
  onStatusChange,
  showStatus = true
}: ProductCardProps) {
  const [currentStatus, setCurrentStatus] = useState(product.status);
  
  useEffect(() => {
    setCurrentStatus(product.status);
  }, [product.status]);

  const statusColors = {
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const handleStatusChange = (status: 'approved' | 'rejected') => {
    if (onStatusChange) {
      setCurrentStatus(status);
      onStatusChange(product.id, status);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg truncate text-gray-800">{product.title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[currentStatus]}`}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
          <p className="text-xs text-gray-500 mt-1">Added: {new Date(product.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          {onStatusChange && currentStatus === 'pending' && (
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange('approved')}
                className="px-3 py-1.5 text-sm font-medium bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
              >
                Reject
              </button>
            </div>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => onView(product)}
              className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
              title="View details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
              title="Delete product"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}