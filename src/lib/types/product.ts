export interface Product {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface ProductResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}