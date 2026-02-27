'use client'
import { useEffect , useMemo } from "react"
import { useProductStore } from "../../store/product.store"
import { useProducts } from "./useProducts"
import { useDebounce } from "./useDebounce"

const ITEMS_PER_PAGE = 20;
export default function useFilteredProducts() {
    const state = useProductStore()
    const debouncedSearch = useDebounce(state.search, 600);
    const { data, isLoading, isError } = useProducts({
        limit: 194,
        skip: 0,
        search: debouncedSearch,
    });

    const processedProducts = useMemo(() => {
        if (!data?.products) return []
    
        let result = data.products.filter((p) => {
        const matchesCategory = state.categories.length === 0 || state.categories.includes(p.category);
        const matchesBrand = state.brands.length === 0 || state.brands.includes(p.brand);
        const finalPrice = p.price - (p.price * p.discountPercentage) / 100;
        const matchesPrice = finalPrice >= state.minPrice && finalPrice <= state.maxPrice;
        const matchesStock = !state.inStock || p.stock > 0;
        return matchesCategory && matchesBrand && matchesPrice && matchesStock;
        });

        return result.sort((a, b) => {
        switch (state.sort) {
            case 'price-desc': return b.price - a.price;
            case 'price-asc': return a.price - b.price;
            case 'discount-desc': return b.discountPercentage - a.discountPercentage;
            case 'newest': return b.id - a.id;
            default: return 0;
        }
    });
    } , [data, state.categories, state.sort, state.brands, state.minPrice, state.maxPrice, state.inStock])

    const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const start = (state.page - 1) * ITEMS_PER_PAGE;
        return processedProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [processedProducts, state.page]);

    useEffect(() => {
    state.setPage(1);
    }, [state.categories, state.sort, state.brands, state.minPrice, state.maxPrice, state.inStock, debouncedSearch]);
    
    return { 
    products: paginatedProducts, 
    totalCount: processedProducts.length,
    isSearching: state.search !== debouncedSearch,
    isLoading, 
    isError, 
    totalPages,
    currentPage: state.page,
    setPage: state.setPage
  };
}
