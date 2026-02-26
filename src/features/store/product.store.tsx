import { create } from 'zustand';
import { Product } from '../products/types';
import { SortOption } from '../products/types';

type ProductStore = {
  page: number;
  search: string;
  categories: string[];
  sort: SortOption;
  setPage: (page: number) => void;
  setSearch: (value: string) => void;
  toggleCategory: (slug: string) => void;
  clearCategories: () => void;
  setSort: (v: SortOption) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  page: 1,
  search: '',
  categories: [],
  sort: 'newest',
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 1 }),
  toggleCategory: (slug) => {
    const { categories } = get();
    const exists = categories.includes(slug);
    set({
      categories: exists
        ? categories.filter((c) => c !== slug)
        : [...categories, slug],
      page: 1,
    });
  },
  clearCategories: () => set({ categories: [], page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
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