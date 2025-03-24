import { Product } from "@/lib/types/product";
import { Modal } from "@/components/ui/modal";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details" size="lg">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              product.status === "approved"
                ? "bg-green-100 text-green-800 border border-green-200"
                : product.status === "rejected"
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
            }`}
          >
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 whitespace-pre-line">
            {product.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Added on</p>
            <p className="text-gray-900">
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {product.status === "pending" && (
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => {
                onClose();
              }}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() => {
                onClose();
              }}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
            >
              Reject
            </button>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
