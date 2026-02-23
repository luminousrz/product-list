'use client';

import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { useDebounce } from "../features/products/hooks/useDebounce";
import { useProducts } from "../features/products/hooks/useProducts";
import { useProductStore } from "../features/store/product.store";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

const LIMIT = 12;

export default function Home() {
  const { page, search, category, setPage, setSearch } = useProductStore();
  const debouncedSearch = useDebounce(search, 600);

  const { data, isLoading, isError } = useProducts({
    limit: LIMIT,
    skip: (page - 1) * LIMIT,
    search: debouncedSearch,
    category: "smartphones"
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <div className="p-8">
      <div className="flex gap-5">
        {data && (
          <p>{data.total} Products</p>
        )}
        <div className="rounded-md relative bg-gray-200 flex items-center h-7.5 px-3 w-[90%]">
          <CiSearch className="absolute text-[#747e8d]"/>
          <input type="text"  value={search}
          onChange={(e) => setSearch(e.target.value)} placeholder="Search Product" className="w-[90%] px-5 py-1 placeholder:text-[14px] placeholder:text-gray-400 outline-0 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {data?.products.map((p) => (
          <div key={p.id} className="">
            <div className=" rounded-xl p-5 shadow-md bg-gray-50 grid gap-3">
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
                  <del>{p.price}</del>
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
