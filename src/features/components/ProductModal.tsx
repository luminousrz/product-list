'use client';

import { useProductModal } from '../store/product.store';
import { AiOutlineHeart } from "react-icons/ai"; 
import { MdAssignmentReturn } from "react-icons/md"; 
import { BiBadgeCheck } from "react-icons/bi"; 
import { FaShippingFast } from "react-icons/fa"; 
import ProductGallery from './ProductGallery';

export default function ProductModal() {
  const product = useProductModal((s) => s.selectedProduct);
  const close = useProductModal((s) => s.close);

  if (!product) return null;

  return (
    <>
    <div onClick={close} className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40"/>

    <div className="fixed inset-0 z-50 flex iitems-start md:items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white p-6 relative animate-scaleIn  max-h-[90vh] overflow-y-auto">
            
           {/* Closing Modal */}
          <button onClick={close} className="absolute right-4 top-4 text-xl cursor-pointer">
            ✕
          </button>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Images */}
            <div className="relative z-10 bg-white rounded-2xl p-6 max-w-3xl w-full lg:mt-0 mt-3">
                <ProductGallery images={product.images} title={product.title} />
            </div>

            {/* Info */}
            <div className='flex flex-col justify-between'>
              <p className="text-sm text-gray-400">{product.category}</p>
              <div className='flex flex-col'>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <span className=" text-green-700 ">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                ⭐ {product.rating} | <span>123 Reviews</span>
              </div>

              <p className="mt-5 text-gray-600">
                {product.description} 
              </p>

              <div className='mt-4 flex flex-col gap-1'>
                <div className='flex items-center gap-2'>
                    <div className='rounded-xl bg-black text-white p-2 text-sm'>10%</div>
                    <del className='text-gray-600'>{product.discountPercentage}</del>
                </div>
                <p className="text-2xl font-bold">
                    ${product.price}
                </p>
              </div>

              <div className='flex gap-3 mt-6'>
                <button className="w-full rounded-xl bg-black py-3 text-white">
                    Add to Cart
                </button>
                <button className='border rounded-xl py-3 px-3'>
                    <AiOutlineHeart/>
                </button>
              </div>
                {/* Policy */}
              <div className='border border-gray-100 flex flex-col gap-2 rounded-xl mt-4 py-2 px-4'>
                <div className='flex gap-2 text-[14px]'>
                    <FaShippingFast className='text-[20px]'/>
                    <p>Shipping Information :</p><span className='text-gray-500'>Ships in 2 weeks</span>
                </div>
                <div className='flex gap-2 text-[14px]'>
                    <BiBadgeCheck className='text-[20px]'/>
                    <p>Warranty Information :</p><span className='text-gray-500'>3 years Warranty</span>
                </div>
                <div className='flex gap-2 text-[14px]'>
                    <MdAssignmentReturn className='text-[20px]'/>
                    <p>Return Policy :</p><span className='text-gray-500'>7 days return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}