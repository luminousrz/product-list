'use client'
import { Product } from "../products/types"
import Image from "next/image"
import { useProductModal } from "../store/product.store"

type ProductCardProps = {
    product: Product;
}
export default function ProductCard({product}: ProductCardProps) {
    const open = useProductModal((s) => s.open)
  return (
    <div className="grid justify-center items-center cursor-pointer" onClick={() => open(product)}>
        <div className="rounded-xl p-5 shadow-md bg-gray-50 flex flex-col gap-3 w-65 min-h-95">
            <div className="flex flex-col items-center">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover bg-mist-100"
                />
            </div>
            <p>{product.title}</p>
            <div>
                <div className="flex gap-2 items-center">
                    <span className="p-1 rounded-md bg-black text-white">10%</span>
                    <del className="text-gray-500">{product.price}</del>
                </div>
                <p>${product.discountPercentage}</p>
            </div>
        </div>
    </div>
  )
}
