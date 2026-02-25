'use client';

import ProductCard from "../features/components/ProductCard";
import ProductModal from "../features/components/ProductModal";
import { useDebounce } from "../features/products/hooks/useDebounce";
import { useProducts } from "../features/products/hooks/useProducts";
import { useProductStore } from "../features/store/product.store";
import { CiSearch } from "react-icons/ci";
import SortDropdown from "../features/components/SortDropdown";
const LIMIT = 20;

export default function Home() {
  const { page, search, category, sort, setPage, setSearch } = useProductStore();
  const debouncedSearch = useDebounce(search, 600);

  const { data, isLoading, isError } = useProducts({
    limit: LIMIT,
    skip: (page - 1) * LIMIT,
    search: debouncedSearch,
    category,
    sort,
  });

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
      <div className="flex justify-center gap-5 mb-4">
        {data && (
          <p>{data.total} Products</p>
        )}
        <div className="rounded-md relative bg-white flex items-center h-7.5 px-3 w-[90%]">
          <CiSearch className="absolute text-[#747e8d]"/>
          <input type="text"  value={search}
          onChange={(e) => setSearch(e.target.value)} placeholder="Search Product" className="w-[90%] px-5 py-1 placeholder:text-gray-400 outline-0 text-gray-500" />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
          <SortDropdown />
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {data?.products.map((p) => (
          <ProductCard key={p.id} product={p}></ProductCard>
        ))}
      </div>

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        قبلی
      </button>
      <button onClick={() => setPage(page + 1)}>بعدی</button>
    </div>
  );
}
