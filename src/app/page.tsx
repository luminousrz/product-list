'use client';
import ProductCard from "../features/components/ProductCard";
import ProductModal from "../features/components/ProductModal";
import { useProductStore } from "../features/store/product.store";
import { CiSearch } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr"; 
import 'swiper/css';
import useFilteredProducts from "../features/products/hooks/useFilteredProducts";
import ProductFilters from "../features/components/filters/ProductFilters";

export default function Home() {
  const { search, setSearch } = useProductStore();
  const { products, totalCount, isLoading, isError, totalPages, currentPage, setPage } = useFilteredProducts();

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
      <ProductModal />
      
      {/* Search Header */}
      <div className="flex justify-center items-center gap-5 mb-4">
        <p className="md:flex hidden text-gray-500 font-medium">{totalCount} Products</p>
        <div className="rounded-xl relative bg-white flex items-center h-10 px-3 w-[80%] shadow-sm">
          <CiSearch className="absolute text-gray-400"/>
          <input 
            type="text" value={search} onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search Product..." className="w-full pl-7 outline-0 text-gray-600" 
          />
        </div>
      </div>

      <ProductFilters />

      {/* Product Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button className="p-2 disabled:opacity-30 cursor-pointer" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
            <GrPrevious />
          </button>
          <span className="font-medium">Page {currentPage} of {totalPages}</span>
          <button className="p-2 disabled:opacity-30 cursor-pointer" onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <GrNext />
          </button>
        </div>
      )}
    </div>
  );
}
