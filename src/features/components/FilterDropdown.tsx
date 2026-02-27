import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { BsChevronDown } from "react-icons/bs";

interface FilterItem {
  slug: string;
  name: string;
}

interface FilterDropdownProps {
  title: string;
  items: FilterItem[];
  selected: string[];
  onToggle: (slug: string) => void;
  onClear: () => void;
}

export default function FilterDropdown({
  title,
  items,
  selected,
  onToggle,
  onClear,
}: FilterDropdownProps) {
  const label = selected.length === 0 ? `All ${title}` : `${selected.length} selected`;

  const ListContent = () => (
    <div className="space-y-2 max-h-60 overflow-auto">
      {items.map((item) => (
        <label
          key={item.slug}
          className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 outline-none"
        >
          <input
            type="checkbox"
            checked={selected.includes(item.slug)}
            onChange={() => onToggle(item.slug)}
          />
          <span className="text-sm">{item.name}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div>
      {/* Desktop Mode */}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="hidden md:flex items-center justify-between rounded-xl px-6 py-2 min-w-40 gap-3 bg-gray-50 border border-transparent hover:border-gray-200">
            <span className="text-sm">{label}</span>
            <BsChevronDown />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" align="start" className="bg-white rounded-xl shadow-lg p-3 w-64 z-50 border">
            <ListContent />
            {selected.length > 0 && (
              <button onClick={onClear} className="mt-2 text-xs text-red-600 font-medium">
                Clear Filters
              </button>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* Mobile Mode */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="md:hidden w-full rounded-xl px-4 py-2 bg-gray-50 text-left text-sm">
            {title} ({selected.length || "All"})
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 z-[60]" />
          <Dialog.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-[70]">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <ListContent />
            <div className="flex gap-2 mt-4">
              <button onClick={onClear} className="flex-1 py-2 rounded-xl border text-sm">Clear</button>
              <Dialog.Close asChild>
                <button className="flex-1 py-2 rounded-xl bg-black text-white text-sm">Apply</button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}