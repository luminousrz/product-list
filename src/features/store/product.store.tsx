import { create } from 'zustand';

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