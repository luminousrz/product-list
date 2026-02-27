import { PiMaskSadLight } from "react-icons/pi";

export default function EmptyState() {
  const clearFilters = () => {
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-gray-50 p-6 rounded-full mb-4">
        <PiMaskSadLight size={48} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
      <p className="text-gray-500 mt-2 text-center max-w-xs">
        We couldn't find anything matching your current filters.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-6 px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
      >
        Reset All Filters
      </button>
    </div>
  );
}