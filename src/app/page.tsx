'use client';
import { useEffect, useMemo } from "react";
import ProductCard from "../features/components/ProductCard";
import ProductModal from "../features/components/ProductModal";
import { useDebounce } from "../features/products/hooks/useDebounce";
import { useProducts } from "../features/products/hooks/useProducts";
import { useProductStore } from "../features/store/product.store";
import { CiSearch } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr"; 
import SortDropdown from "../features/components/SortDropdown";
import CategoryDropdown from "../features/components/CategoryDropdown";
import BrandDropdown from "../features/components/BrandDropdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTransition } from "react";
import 'swiper/css';
import PriceFilter from "../features/components/PriceFilter";


const ITEMS_PER_PAGE = 20;
export default function Home() {
  const { page, search, categories, sort, brands, setPage, setSearch, minPrice, maxPrice, setPriceRange } = useProductStore();
  const debouncedSearch = useDebounce(search, 600);
  const [isPending, startTransition] = useTransition();
  const { data, isLoading, isError } = useProducts({
    limit: 197, 
    skip: 0,
    search: debouncedSearch,
  });
  const processedProducts = useMemo(() => {
    if (!data?.products) return [];
    let result = data.products.filter((p) => {
      const matchesCategory = categories.length === 0 || categories.includes(p.category);
      const matchesBrand = brands.length === 0 || brands.includes(p.brand);
      const discountAmount = (p.price * p.discountPercentage) / 100;
      const finalPrice = p.price - discountAmount;
      const matchesPrice = finalPrice >= minPrice && finalPrice <= maxPrice;
      return matchesCategory && matchesBrand && matchesPrice;
    });
    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'price-desc':
          return b.price - a.price;
        case 'price-asc':
          return a.price - b.price;
        case 'discount-desc':
          return b.discountPercentage - a.discountPercentage;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });
    return result;
  }, [data, categories, sort, brands, minPrice, maxPrice]);

  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [processedProducts, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [categories, sort, debouncedSearch, setPage]);

  if (isLoading)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg bg-white">
        <span className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
        <p className="text-sm text-green-800">Loading Products ...</p>
      </div>
    </div>
  );
  if (isError)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 p-6 rounded-2xl shadow-lg bg-white">
        <p className="text-lg font-semibold text-red-600">Something Went Wrong</p>
        <p className="text-sm text-gray-500">Check Your Internet Connection and Try Again.</p>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <ProductModal></ProductModal>
      {/* Search Box */}
      <div className="flex justify-center items-center gap-5 mb-4">
        {data && (
          <p className="md:flex hidden">{processedProducts.length} Products</p>
        )}
        <div className="rounded-xl relative bg-white flex items-center h-10 px-3 w-[80%]">
          <CiSearch className="absolute text-[#747e8d]"/>
          <input type="text"  value={search}
          onChange={(e) => setSearch(e.target.value)} placeholder="Search Product..." className="w-[80%] px-5 py-1 placeholder:text-gray-400 outline-0 text-gray-500" />
        </div>
      </div>
      {/* Filters Box */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {/* Mobile Device */}
          <div className="md:hidden w-full">
            <Swiper
              spaceBetween={8}
              slidesPerView={"auto"}
              grabCursor={true}
              touchStartPreventDefault={false}
              slidesOffsetBefore={20} 
              slidesOffsetAfter={20}
              className='w-full'
            >
              <SwiperSlide className="w-auto!">
                <div onPointerDown={(e) => e.stopPropagation()}>
                  <SortDropdown />
                </div>
              </SwiperSlide>

              <SwiperSlide className="w-auto!">
                <div onPointerDown={(e) => e.stopPropagation()}>
                  <CategoryDropdown />
                </div>
              </SwiperSlide>

              <SwiperSlide className="w-auto!">
                <div onPointerDown={(e) => e.stopPropagation()}>
                  <BrandDropdown/>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-auto!">
                <div onPointerDown={(e) => e.stopPropagation()}>
                  <PriceFilter></PriceFilter>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* Desktop Mode */}
          <div className="hidden md:flex gap-4">
            <SortDropdown />
            <CategoryDropdown />
            <BrandDropdown/>
            <PriceFilter></PriceFilter>
          </div>
          {isPending && (
            <p className="text-center text-sm text-gray-400 animate-pulse mb-4">
              Updating price results...
            </p>
          )}
      </div>
      {/* Render products based on what you chose */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button 
            className="px-4 py-2 disabled:opacity-50"
            onClick={() => setPage(page - 1)} 
            disabled={page === 1}
          >
            <GrPrevious />
          </button>
          <span className="font-medium">Page {page} of {totalPages}</span>
          <button 
            className="px-4 py-2  disabled:opacity-50"
            onClick={() => setPage(page + 1)} 
            disabled={page === totalPages}
          >
            <GrNext />
          </button>
        </div>
      )}
    </div>
  );
}
