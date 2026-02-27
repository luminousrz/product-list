import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import * as Slider from "@radix-ui/react-slider";
import { BsChevronDown } from "react-icons/bs";
import { useProductStore } from "../../store/product.store";

export default function PriceFilter() {
  const { minPrice, maxPrice, setPriceRange } = useProductStore();

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values[0], values[1]);
  };

  return (
    <>
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="md:flex hidden items-center justify-between rounded-xl px-6 py-2 min-w-40 gap-3 bg-gray-50 border border-transparent hover:border-gray-200">
                <span className="text-sm">${minPrice} - ${maxPrice}</span>
                <BsChevronDown />
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content side="bottom" align="start" className="bg-white rounded-xl shadow-xl p-6 w-80 z-50 border">
                
                {/* Syncing Inputs */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                    <label className="text-xs text-gray-500">Min</label>
                    <input 
                        type="number" 
                        value={minPrice} 
                        onChange={(e) => setPriceRange(Number(e.target.value), maxPrice)}
                        className="w-full border rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 ring-black"
                    />
                    </div>
                    <div className="flex-1">
                    <label className="text-xs text-gray-500">Max</label>
                    <input 
                        type="number" 
                        value={maxPrice} 
                        onChange={(e) => setPriceRange(minPrice, Number(e.target.value))}
                        className="w-full border rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 ring-black"
                    />
                    </div>
                </div>

                {/* Radix Slider */}
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={[minPrice, maxPrice]}
                    max={5000}
                    step={10}
                    onValueChange={handleSliderChange}
                >
                    <Slider.Track className="bg-gray-200 relative grow h-0.75 rounded-full">
                    <Slider.Range className="absolute bg-black h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-black shadow-md rounded-full hover:scale-110 transition-transform cursor-pointer outline-none" />
                    <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-black shadow-md rounded-full hover:scale-110 transition-transform cursor-pointer outline-none" />
                </Slider.Root>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>

        <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="md:hidden w-full rounded-xl px-4 py-2 bg-gray-50 text-left text-sm">
                <span className="text-sm">${minPrice} - ${maxPrice}</span>
            </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30 z-60" />
              <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-70">
                <Dialog.Title>
                    <p className="text-lg font-semibold mb-3">Price Range</p>
                </Dialog.Title>
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                    <label className="text-xs text-gray-500">Min</label>
                    <input 
                        type="number" 
                        value={minPrice} 
                        onChange={(e) => setPriceRange(Number(e.target.value), maxPrice)}
                        className="w-full border rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 ring-black"
                    />
                    </div>
                    <div className="flex-1">
                    <label className="text-xs text-gray-500">Max</label>
                    <input 
                        type="number" 
                        value={maxPrice} 
                        onChange={(e) => setPriceRange(minPrice, Number(e.target.value))}
                        className="w-full border rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 ring-black"
                    />
                    </div>
                </div>
                <div className="mt-4">
                    <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={[minPrice, maxPrice]}
                        max={5000}
                        step={10}
                        onValueChange={handleSliderChange}
                    >
                        <Slider.Track className="bg-gray-200 relative grow h-0.75 rounded-full">
                        <Slider.Range className="absolute bg-black h-full rounded-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-black shadow-md rounded-full hover:scale-110 transition-transform cursor-pointer outline-none" />
                        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-black shadow-md rounded-full hover:scale-110 transition-transform cursor-pointer outline-none" />
                    </Slider.Root>
                </div>
                <Dialog.Close asChild>
                    <div className="grid">
                        <button className="py-2 rounded-xl bg-black text-white text-sm mt-5">Apply</button>
                    </div>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </>
  );
}