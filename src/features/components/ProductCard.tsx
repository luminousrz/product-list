'use client'
import { Product } from "../products/types"
import Image from "next/image"
import { useProductModal } from "../store/product.store"

type ProductCardProps = {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
    const discountAmount = (product.price * product.discountPercentage) / 100;
    const finalPrice = product.price - discountAmount;
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
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <span className="p-1 rounded-md bg-gray-500 text-white text-sm">{product.discountPercentage}%</span>
                    <del className="text-gray-500">${product.price.toFixed(2)}</del>
                </div>
                <p className="text-xl font-bold">${finalPrice.toFixed(2)}</p>
            </div>
        </div>
    </div>
  )
}
