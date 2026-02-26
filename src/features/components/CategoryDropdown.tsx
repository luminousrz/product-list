import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover"; 
import { BsChevronDown } from "react-icons/bs";
import { useProductStore } from "../store/product.store";
import { useCategories } from "../products/hooks/useCategories";


export default function CategoryDropdown() {

  const { data: categories = []} = useCategories();
  const selected = useProductStore((s) => s.categories);
  const toggleCategory = useProductStore((s) => s.toggleCategory);
  const clearCategories = useProductStore((s) => s.clearCategories);
  const label =
    selected.length === 0
      ? "All categories"
      : `${selected.length} selected`;

  return (
    <div>
      {/* Desktop */}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="hidden md:flex items-center justify-between rounded-xl px-6 py-2 min-w-40 gap-3 bg-gray-50">
            <span>{label}</span>
            <BsChevronDown />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            className="bg-white rounded-xl shadow-lg p-3 w-64"
          >
            <div className="space-y-2 max-h-60 overflow-auto">
              {categories.map((cat) => (
                <label
                  key={cat.slug}
                  className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>

            {selected.length > 0 && (
              <button
                onClick={clearCategories}
                className="mt-2 text-sm text-red-600"
              >
                Clear
              </button>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* Mobile */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="md:hidden w-full rounded-xl px-4 py-2 bg-gray-50 text-left">
            Categories ({selected.length || "All"})
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>

            <div className="space-y-2 max-h-80 overflow-auto">
              {categories.map((cat) => (
                <label
                  key={cat.slug}
                  className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={clearCategories}
                className="flex-1 py-2 rounded-xl border"
              >
                Clear
              </button>
              <Dialog.Close asChild>
                <button className="flex-1 py-2 rounded-xl bg-black text-white">
                  Apply
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}