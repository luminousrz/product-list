import axios from "axios";
import { Category, SortOption } from "../types";


const api = axios.create({
    baseURL: 'https://dummyjson.com',
})
const SORT_MAP = {
  'newest' : {sortBy:'id' , order:'desc'},
  'price-desc' : {sortBy:'price' , order:'desc'},
  'price-asc' : {sortBy:'price' , order:'asc'},
  'discount-desc' : {sortBy:'discountPercentage' , order:'desc'},
} as const;

export const getProducts = async (params: {
  limit: number;
  skip: number;
  search?: string;
  category?: string;
  sort?: SortOption;
}) => {
  const { limit, skip, search, category, sort} = params;

  const query = new URLSearchParams();
  query.set('limit', String(limit));
  query.set('skip', String(skip));

  if(sort){
    const {sortBy , order} = SORT_MAP[sort]
    query.set('sortBy',sortBy)
    query.set('order', order)
  }

  let url = '/products'

  if(search){
    query.set('q', search)
    url = '/products/search'
  } else if (category) {
    query.set('category', category)
    url = `/products/category/${category}`
  }
  
  const { data } = await api.get(`${url}?${query.toString()}`);
  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/products/categories');
  return data;
};