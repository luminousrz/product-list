import { useProductStore } from "../../store/product.store"

export default function StockSwitch() {
    const { inStock , toggleStock } = useProductStore()
  return (
    <button
      onClick={toggleStock}
      className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
    >
      <span className="text-sm text-gray-700">In Stock Only</span>
      <div 
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
          inStock ? 'bg-black' : 'bg-gray-300'
        }`}
      >
        <div 
          className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-200 ${
            inStock ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  )
}
