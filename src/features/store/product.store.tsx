import { create } from 'zustand';
import { Product } from '../products/types';
import { SortOption } from '../products/types';

type ProductStore = {
  page: number;
  search: string;
  category: string;
  sort: SortOption;
  setPage: (page: number) => void;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setSort: (v: SortOption) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  page: 1,
  search: '',
  category: '',
  sort: 'newest',
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setSort: (sort) => set({ sort , page:1 }),
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