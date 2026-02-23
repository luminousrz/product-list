import { useQuery , keepPreviousData} from '@tanstack/react-query';
import { getProducts } from '../services/product.api';
import { ProductsResponse , GetProductsParams} from '../types';

export const useProducts = (params: GetProductsParams) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
};