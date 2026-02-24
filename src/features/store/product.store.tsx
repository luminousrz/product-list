import { create } from 'zustand';
import { Product } from '../products/types';

type ProductState = {
  page: number;
  search: string;
  category: string;
  setPage: (page: number) => void;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  page: 1,
  search: '',
  category: '',
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
}));

type ProductModalState = {
  selectedProduct: Product | null,
  open: (product: Product) => void
  close: () => void
}

export const useProductModal = create<ProductModalState>((set) => ({
  selectedProduct: null,
  open: (product) => set({selectedProduct: product}),
  close: () => set({selectedProduct: null})
}));