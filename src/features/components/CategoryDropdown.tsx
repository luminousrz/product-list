import { useCategories } from "../products/hooks/useCategories";
import { useProductStore } from "../store/product.store";
import FilterDropdown from "./FilterDropdown";

export default function CategoryDropdown() {
  const { data: categories = [] } = useCategories();
  const selected = useProductStore((s) => s.categories);
  const toggleCategory = useProductStore((s) => s.toggleCategory);
  const clearCategories = useProductStore((s) => s.clearCategories);

  const formattedItems = categories.map(cat => ({ slug: cat.slug, name: cat.name }));

  return (
    <FilterDropdown
      title="Categories"
      items={formattedItems}
      selected={selected}
      onToggle={toggleCategory}
      onClear={clearCategories}
    />
  );
}