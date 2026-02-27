import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { BsChevronDown } from "react-icons/bs"; 
import { SortOption } from "../../products/types";
import { useProductStore } from "../../store/product.store";


const options: {label: string , value: SortOption} [] = [
    {label: "Newest" , value: "newest"},
    {label: "Highest to Lowest Price" , value: "price-desc"},
    {label: "Lowest to Highest Price" , value: "price-asc"},
    {label: "Highest Discount" , value: "discount-desc"},
]

export default function SortDropdown(){
    const sort = useProductStore((s) => s.sort)
    const setSort = useProductStore((s) => s.setSort)

    return(
        <div>
          <Select.Root value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <Select.Trigger className="items-center justify-between rounded-xl px-6 py-2 min-w-40 gap-5 bg-gray-50 hidden md:flex border-0">
                <Select.Value />
                <Select.Icon><BsChevronDown /></Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                side="bottom"
                align="start"
                sideOffset={0}
                avoidCollisions={false}
                position="popper"
                className="bg-white rounded-xl border shadow-lg overflow-hidden min-w-(--radix-select-trigger-width)"
              >
                <Select.Viewport>
                  {options.map((item) => (
                    <Select.Item
                      key={item.value}
                      value={item.value}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 outline-none"
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="md:hidden border-0 rounded-xl px-4 py-2 w-full text-left bg-gray-50">
                Sort: {options.find((o) => o.value === sort)?.label}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30" />

              <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 animate-slideUp">
                <h3 className="text-lg font-semibold mb-3">Sort by</h3>

                <div className="space-y-2">
                  {options.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setSort(item.value);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl border ${
                        sort === item.value
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <Dialog.Close asChild>
                  <button className="mt-4 w-full py-2 text-sm text-red-700">
                    Close
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
    )
}