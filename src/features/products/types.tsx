export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type GetProductsParams = {
  limit: number;
  skip: number;
  search?: string;
  category?: string;
  sort?: 'newest' | 'price-desc' | 'price-asc' | 'discount-desc';
};
export type SortOption = 
  | 'newest'
  | 'price-desc'
  | 'price-asc'
  | 'discount-desc';