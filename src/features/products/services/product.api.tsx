import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com',
})

export const getProducts = async (params: {
  limit: number;
  skip: number;
  search?: string;
  category?: string;
}) => {
  const { limit, skip, search, category } = params;

  if (search) {
    const { data } = await api.get(`/products/search?q=${search}&limit=${limit}&skip=${skip}`);
    return data;
  }

  if (category) {
    const { data } = await api.get(`/products/category/${category}?limit=${limit}&skip=${skip}`);
    return data;
  }

  const { data } = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return data;
};