'use client'
import { useMemo } from "react";
import FilterDropdown from "./FilterDropdown";
import { useProducts } from "../../products/hooks/useProducts";
import { useProductStore } from "../../store/product.store";

export default function BrandDropdown() {
  const { data } = useProducts({ limit: 197, skip: 0 });
  const selected = useProductStore((s) => s.brands);
  const toggleBrand = useProductStore((s) => s.toggleBrand);
  const clearBrands = useProductStore((s) => s.clearBrands);

  const brands = useMemo(() => {
    if (!data?.products) return [];
    const unique = Array.from(new Set(data.products.map(p => p.brand))).filter(Boolean);
    return unique.sort().map(b => ({ slug: b, name: b }));
  }, [data]);

  return (
    <FilterDropdown 
      title="Brands"
      items={brands}
      selected={selected}
      onToggle={toggleBrand}
      onClear={clearBrands}
    />
  );
}