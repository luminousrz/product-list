'use client';

import { useDebounce } from "../features/products/hooks/useDebounce";
import { useProducts } from "../features/products/hooks/useProducts";
import { useProductStore } from "../features/store/product.store";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

const LIMIT = 20;

export default function Home() {
  const { page, search, category, setPage, setSearch } = useProductStore();
  const debouncedSearch = useDebounce(search, 600);

  const { data, isLoading, isError } = useProducts({
    limit: LIMIT,
    skip: (page - 1) * LIMIT,
    search: debouncedSearch,
    category
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 justify-center">
        {data?.products.map((p) => (
          <div key={p.id} className="grid justify-center items-center">
            <div className="rounded-xl p-5 shadow-md bg-gray-50 flex flex-col gap-3 w-65 min-h-95">
              <div className="flex flex-col items-center">
                <Image
                  src={p.thumbnail}
                  alt={p.title}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover bg-mist-100"
                />
              </div>
              <p>{p.title}</p>
              <div>
                <div className="flex gap-2 items-center">
                  <span className="p-1 rounded-md bg-black text-white">10%</span>
                  <del className="text-gray-500">{p.price}</del>
                </div>
                <p>${p.discountPercentage}</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        قبلی
      </button>
      <button onClick={() => setPage(page + 1)}>بعدی</button>
    </div>
  );
}
